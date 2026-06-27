import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiLoader, FiChevronLeft, FiChevronRight, FiMaximize, FiMinimize } from 'react-icons/fi';
const UnnatiLogo = "https://res.cloudinary.com/drhkvdtw2/image/upload/v1782396887/unnati_assets/Unnati.png";

// Canvas Renderer Component for a single PDF page
const PdfPageCanvas = ({ pdf, pageNumber, width, height }) => {
  const canvasRef = useRef(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    let active = true;
    if (!pdf) return;

    const renderPage = async () => {
      try {
        const page = await pdf.getPage(pageNumber);
        
        // Calculate canvas scaling
        const originalViewport = page.getViewport({ scale: 1 });
        const scaleX = width / originalViewport.width;
        const scaleY = height / originalViewport.height;
        // Keep aspect ratio intact while fitting page
        const scale = Math.min(scaleX, scaleY);
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        
        await page.render(renderContext).promise;
        if (active) setRendered(true);
      } catch (err) {
        console.error(`Error rendering PDF page ${pageNumber}:`, err);
      }
    };

    renderPage();

    return () => {
      active = false;
    };
  }, [pdf, pageNumber, width, height]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-white overflow-hidden relative select-none">
      <canvas ref={canvasRef} className="shadow-lg max-w-full max-h-full object-contain" />
      {!rendered && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#06122C]/40 backdrop-blur-sm">
          <FiLoader className="text-[#FBBF24] animate-spin" size={24} />
        </div>
      )}
    </div>
  );
};

const ResourceReader = ({ isOpen, onClose, docUrl, docTitle }) => {
  const isLocalPdf = docUrl && (docUrl.endsWith('.pdf') || docUrl.startsWith('/documents/'));
  const [isLoading, setIsLoading] = useState(true);
  const [pdf, setPdf] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentSheet, setCurrentSheet] = useState(0);
  const [pdfError, setPdfError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Responsive layout dimensions
  const [dimensions, setDimensions] = useState({ width: 800, height: 565 });
  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
      setPdfError(null);
      setCurrentSheet(0);
      setPdf(null);
      setNumPages(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, docUrl]);

  // Load PDF.js dynamically for local PDF files
  useEffect(() => {
    if (!isOpen || !isLocalPdf) return;

    let active = true;

    const initPdf = async () => {
      try {
        await new Promise((resolve, reject) => {
          if (window.pdfjsLib) {
            resolve();
            return;
          }
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
          script.onload = () => {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
            resolve();
          };
          script.onerror = () => reject(new Error('Failed to load PDF.js engine'));
          document.head.appendChild(script);
        });

        if (!active) return;

        const loadingTask = window.pdfjsLib.getDocument(docUrl);
        const pdfDoc = await loadingTask.promise;
        
        if (!active) return;
        setPdf(pdfDoc);
        setNumPages(pdfDoc.numPages);
        setIsLoading(false);
      } catch (err) {
        console.error("PDF loading error:", err);
        if (active) {
          setPdfError(err.message || 'Error parsing PDF document');
          setIsLoading(false);
        }
      }
    };

    initPdf();

    return () => {
      active = false;
    };
  }, [isOpen, docUrl, isLocalPdf]);

  // Calculate booklet sizing maintaining A4 page ratios
  useEffect(() => {
    if (!isOpen) return;

    const updateDimensions = () => {
      const isMobile = window.innerWidth < 768;
      const margin = isMobile ? 24 : 80;
      const maxH = window.innerHeight - (isMobile ? 180 : 160);
      const maxW = window.innerWidth - margin;

      // Portrait aspect ratio (A4 is approx 1:1.414)
      // Double page spread width = 2 * pageWidth
      let height = Math.min(maxH, 620);
      let pageWidth = height / 1.414;
      let width = pageWidth * 2;

      if (width > maxW) {
        width = maxW;
        pageWidth = width / 2;
        height = pageWidth * 1.414;
      }

      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || !isLocalPdf) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLocalPdf, currentSheet, numPages]);

  if (!isOpen) return null;

  const totalSheets = Math.ceil((numPages + 1) / 2);

  const handleNext = () => {
    setCurrentSheet(prev => Math.min(prev + 1, totalSheets));
  };

  const handlePrev = () => {
    setCurrentSheet(prev => Math.max(prev - 1, 0));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error(err));
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Stacking index formula for book sheets
  const getSheetStyle = (idx) => {
    const isFlipped = idx < currentSheet;
    const zIndex = isFlipped ? idx : (totalSheets - idx);
    return {
      '--z-index': zIndex,
      transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
    };
  };

  // Human-friendly page indicators
  const getPageIndicator = () => {
    if (currentSheet === 0) {
      return `Cover (Page 1 of ${numPages})`;
    }
    if (currentSheet === totalSheets) {
      return `Back Cover (Page ${numPages} of ${numPages})`;
    }
    const leftPage = currentSheet * 2;
    const rightPage = currentSheet * 2 + 1;
    return `Pages ${leftPage} – ${Math.min(rightPage, numPages)} of ${numPages}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] bg-[#030C20] flex flex-col w-screen h-screen font-sans select-none"
      ref={containerRef}
    >
      
      {/* 3D Animation Sheet Styles */}
      <style>{`
        .flipbook-container {
          perspective: 2000px;
          transform-style: preserve-3d;
          position: relative;
        }
        .flipbook-sheet {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 100%;
          transform-origin: left center;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          z-index: var(--z-index);
        }
        .page-face {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          box-shadow: inset -5px 0 25px rgba(0,0,0,0.05), 0 10px 25px rgba(0,0,0,0.1);
        }
        .page-face.front {
          z-index: 2;
        }
        .page-face.back {
          transform: rotateY(180deg);
          z-index: 1;
        }
        /* Binding Shadow in Middle */
        .book-binding-spine {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 100%;
          background: linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.2) 100%);
          z-index: 100;
          pointer-events: none;
        }
      `}</style>

      {/* HEADERBAR */}
      <div className="bg-[#06122C] border-b border-white/10 px-4 md:px-8 py-3.5 flex items-center justify-between shrink-0 relative z-20">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-xs md:text-sm font-bold bg-white/5 hover:bg-white/10 px-3.5 py-1.5 md:py-2 rounded-xl border border-white/5 cursor-pointer"
        >
          <FiArrowLeft size={16} />
          <span>Back to Resources</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-md">
            <img src={UnnatiLogo} alt="Logo" className="w-full h-full object-cover scale-125 animate-pulse" />
          </div>
          <span className="text-[#FBBF24] text-[10px] sm:text-xs font-bold uppercase tracking-wider hidden sm:inline-block">UNNATI NATIVE READER</span>
        </div>

        <div className="flex items-center gap-4">
          <h2 className="text-white text-xs sm:text-sm md:text-base font-extrabold leading-tight text-right">{docTitle}</h2>
          <button 
            onClick={toggleFullscreen}
            className="text-gray-300 hover:text-white bg-white/5 p-2 rounded-lg cursor-pointer transition-colors border border-white/5"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <FiMinimize size={16} /> : <FiMaximize size={16} />}
          </button>
        </div>
      </div>

      {/* BODY CONTENT AREA */}
      <div className="flex-1 relative w-full h-full bg-[#030C20] flex items-center justify-center p-4">
        
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#030C20] z-30">
            <FiLoader className="text-[#FBBF24] animate-spin" size={36} />
            <span className="text-gray-300 text-sm font-semibold tracking-wide">Rendering digital flipbook...</span>
          </div>
        )}

        {/* Error State */}
        {pdfError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#030C20] p-6 text-center z-30">
            <div className="p-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl max-w-md">
              <h3 className="font-extrabold mb-1">Failed to read document</h3>
              <p className="text-xs text-red-400/90 leading-relaxed">{pdfError}</p>
            </div>
            <button onClick={onClose} className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-all">
              Return to Resources
            </button>
          </div>
        )}

        {/* LOCAL 3D FLIPBOOK VIEW */}
        {isLocalPdf && pdf && !isLoading && (
          <div 
            className="flipbook-container flex items-center justify-center relative shadow-2xl rounded-lg bg-[#010612]/30 border border-white/5"
            style={{ width: dimensions.width, height: dimensions.height }}
          >
            
            {/* Center Spine Book Shadow */}
            <div className="book-binding-spine"></div>

            {/* Click-to-flip targets */}
            {currentSheet > 0 && (
              <div 
                onClick={handlePrev}
                className="absolute left-0 top-0 w-[8%] h-full cursor-pointer hover:bg-gradient-to-r hover:from-white/5 z-50 rounded-l-lg transition-colors flex items-center justify-start pl-2 text-white/40 hover:text-white"
                title="Previous Page"
              >
                <FiChevronLeft size={24} />
              </div>
            )}
            {currentSheet < totalSheets && (
              <div 
                onClick={handleNext}
                className="absolute right-0 top-0 w-[8%] h-full cursor-pointer hover:bg-gradient-to-l hover:from-white/5 z-50 rounded-r-lg transition-colors flex items-center justify-end pr-2 text-white/40 hover:text-white"
                title="Next Page"
              >
                <FiChevronRight size={24} />
              </div>
            )}

            {/* Render Sheets in proper stacking order */}
            {Array.from({ length: totalSheets }).map((_, idx) => {
              const frontPageNum = idx * 2 + 1;
              const backPageNum = idx * 2 + 2;

              return (
                <div 
                  key={idx} 
                  className={`flipbook-sheet ${idx < currentSheet ? 'flipped' : ''}`}
                  style={getSheetStyle(idx)}
                >
                  
                  {/* FRONT SIDE FACE (Visible on right page) */}
                  <div className="page-face front bg-white border-l border-gray-100">
                    {frontPageNum <= numPages ? (
                      <PdfPageCanvas 
                        pdf={pdf} 
                        pageNumber={frontPageNum} 
                        width={dimensions.width / 2} 
                        height={dimensions.height} 
                      />
                    ) : (
                      <div className="w-full h-full bg-[#FAFAFA] flex items-center justify-center text-gray-300 font-bold text-xs select-none">
                        End of Document
                      </div>
                    )}
                  </div>

                  {/* BACK SIDE FACE (Visible on left page when flipped) */}
                  <div className="page-face back bg-white border-r border-gray-100">
                    {backPageNum <= numPages ? (
                      <PdfPageCanvas 
                        pdf={pdf} 
                        pageNumber={backPageNum} 
                        width={dimensions.width / 2} 
                        height={dimensions.height} 
                      />
                    ) : (
                      <div className="w-full h-full bg-[#FAFAFA] flex items-center justify-center text-gray-300 font-bold text-xs select-none">
                        End of Document
                      </div>
                    )}
                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* EXTERNAL IFRAME PLAYER FALLBACK */}
        {!isLocalPdf && (
          <div className="w-full h-full relative z-10 bg-black/40 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              src={docUrl}
              title={docTitle}
              onLoad={() => setIsLoading(false)}
              className="w-full h-full border-none"
              allowFullScreen
              allow="clipboard-write"
            ></iframe>
          </div>
        )}

      </div>

      {/* FOOTERBAR (NATIVE BOOKLET ONLY) */}
      {isLocalPdf && pdf && !isLoading && (
        <div className="bg-[#06122C] py-3.5 px-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 shrink-0 select-none z-20">
          
          {/* Left Arrow Button */}
          <button 
            onClick={handlePrev} 
            disabled={currentSheet === 0}
            className="flex items-center gap-1 hover:text-white transition-colors disabled:opacity-30 disabled:hover:text-gray-400 font-semibold cursor-pointer py-1 px-3 bg-white/5 rounded-lg border border-white/5"
          >
            <FiChevronLeft size={16} /> Prev
          </button>
          
          {/* Middle Indicator */}
          <span className="font-bold tracking-wide text-gray-300 bg-white/5 py-1 px-4 rounded-full border border-white/5">
            {getPageIndicator()}
          </span>

          {/* Right Arrow Button */}
          <button 
            onClick={handleNext} 
            disabled={currentSheet === totalSheets}
            className="flex items-center gap-1 hover:text-white transition-colors disabled:opacity-30 disabled:hover:text-gray-400 font-semibold cursor-pointer py-1 px-3 bg-white/5 rounded-lg border border-white/5"
          >
            Next <FiChevronRight size={16} />
          </button>

        </div>
      )}

    </motion.div>
  );
};

export default ResourceReader;
