import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiClient } from '../api/client';
import { CheckCircle, XCircle, Award, User, Hash, Users, Calendar, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download, Printer, Eye } from 'lucide-react';

/* ────────────────────────────────────────────────────────────────
   SIGNATURE BLOCK
──────────────────────────────────────────────────────────────── */
const SigBlock = ({ imgSrc, name, title, subtitle, left, bottom, imgW }) => (
  <div
    style={{
      position: 'absolute',
      bottom: `${bottom}px`,
      left: `${left}px`,
      width: '235px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      background: 'transparent',
      zIndex: 3,
      mixBlendMode: 'multiply',
    }}
  >
    <img
      src={imgSrc}
      alt="signature"
      crossOrigin="anonymous"
      style={{
        width: `${imgW}px`,
        height: 'auto',
        filter: 'contrast(1.2)',
        display: 'block',
        marginBottom: '4px',
      }}
    />
    <div style={{ borderTop: '1.5px solid #0b1a34', width: '100%', marginBottom: '6px' }} />
    <div style={{ fontSize: '11px', fontFamily: 'Arial,sans-serif', fontWeight: 700, color: '#0b1a34', letterSpacing: '0.03em', lineHeight: '16px' }}>
      {name}
    </div>
    <div style={{ fontSize: '10.5px', fontFamily: 'Arial,sans-serif', fontWeight: 700, color: '#0b1a34', lineHeight: '15px' }}>
      {title}
    </div>
    {subtitle && (
      <div style={{ fontSize: '10.5px', fontFamily: 'Arial,sans-serif', fontWeight: 700, color: '#0b1a34', lineHeight: '15px' }}>
        {subtitle}
      </div>
    )}
  </div>
);

/* ────────────────────────────────────────────────────────────────
   CERTIFICATE CANVAS
──────────────────────────────────────────────────────────────── */
const CertificateCanvas = React.forwardRef(({ data }, ref) => {
  // Use a fallback for body if it's missing {gender} etc
  const bodyText = data.bodyText || 'in recognition of {gender} sincere dedication and valuable contribution to spreading digital literacy and foundational education through Unnati Society under the Institutional Outreach Activity.';
  const gender = data.gender || 'his';
  const body = bodyText.replace('{gender}', gender);

  return (
    <div
      ref={ref}
      style={{
        width: '1122px',
        height: '794px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Background template */}
      <img 
        src="https://ik.imagekit.io/unnati/v1783182561/certificates/wsiz3egpixlklxo3fni0.png" 
        alt="Certificate Template" 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        crossOrigin="anonymous"
      />

      <div style={{ position: 'absolute', top: '80px', right: '75px', fontSize: '12.5px', fontFamily: 'Arial, sans-serif', fontWeight: 700, color: '#0b1a34', letterSpacing: '0.04em', zIndex: 3 }}>
        {data.referenceNo}
      </div>

      <div style={{ position: 'absolute', top: '340px', left: 0, right: 0, textAlign: 'center', fontSize: '21px', fontFamily: 'Arial, "Helvetica Neue", sans-serif', fontWeight: 700, letterSpacing: '5px', color: '#0b1a34', zIndex: 3 }}>
        {data.appreciationType || 'OF APPRECIATION'}
      </div>

      <div style={{ position: 'absolute', top: '378px', left: '62px', right: '62px', textAlign: 'center', fontSize: '17.5px', lineHeight: '30px', fontFamily: 'Georgia, "Times New Roman", serif', color: '#0b1a34', zIndex: 3 }}>
        {'This certificate is awarded to '}
        <span style={{ fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          {data.recipientName || 'Recipient Name'}
        </span>
        {'(Roll No. '}
        <span style={{ fontWeight: 600 }}>{data.rollNo || 'XXXXXXXXX'}</span>
        {') of the '}
        <span style={{ fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          {data.team}
        </span>
        {' Team, Batch of '}
        <span style={{ fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          {data.batch}
        </span>
        {', '}
        {body}
      </div>

      <SigBlock
        imgSrc="https://ik.imagekit.io/unnati/e_make_transparent:20/v1783182562/certificates/fyqmzwit6gejnpyw0tgo.png"
        name="DR. CHETAN BARDE"
        title="FACULTY MENTOR"
        subtitle="UNNATI SOCIETY"
        left={60} bottom={118} imgW={145}
      />
      <SigBlock
        imgSrc="https://ik.imagekit.io/unnati/e_make_transparent:20/v1783182563/certificates/ivkkvujsef8yhtkawmvl.png"
        name="DR. DHEERAJ KUMAR SINHA"
        title="ASSOCIATE DEAN"
        subtitle="STUDENT WELFARE"
        left={430} bottom={118} imgW={135}
      />
      <SigBlock
        imgSrc="https://ik.imagekit.io/unnati/e_make_transparent:20/v1783182564/certificates/rsnjl2kjyzjj15iahumn.png"
        name="DR. PRAKASH RANJAN"
        title="ASSOCIATE DEAN"
        subtitle="ALUMI AND INSTITUTIONAL RELATIONS"
        left={810} bottom={118} imgW={115}
      />

      <div style={{
        position: 'absolute',
        bottom: '25px',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: '11.5px',
        fontWeight: 700,
        color: '#3b82f6',
        textDecoration: 'underline',
        fontFamily: 'Arial, sans-serif',
        zIndex: 3,
      }}>
        Verify this certificate's authenticity at unnati.ir/verify/{data.referenceNo || ''}
      </div>
    </div>
  );
});
CertificateCanvas.displayName = 'CertificateCanvas';

const VerificationPage = () => {
  const params = useParams();
  const wildcard = params['*'];
  const [loading, setLoading] = useState(true);
  const [cert, setCert] = useState(null);
  const [error, setError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const captureRef = React.useRef(null);

  useEffect(() => {
    const fetchCert = async () => {
      try {
        if (!wildcard) throw new Error("No certificate reference provided");
        // We use query parameter to safely pass slashes to the backend
        const data = await apiClient.get(`/api/certificates/verify?ref=${encodeURIComponent(wildcard)}`);
        setCert(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCert();
  }, [wildcard]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium animate-pulse">Verifying Certificate Integrity...</p>
      </div>
    );
  }

  if (error || !cert) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-3xl shadow-xl overflow-hidden border border-red-100">
          <div className="bg-red-50 p-6 flex flex-col items-center text-center border-b border-red-100">
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-red-700 mb-1">Verification Failed</h1>
            <p className="text-red-500 text-sm">We could not find a valid certificate with the provided identifier.</p>
          </div>
          <div className="p-6 text-center">
            <p className="text-gray-600 text-sm mb-6">
              This certificate may be invalid, expired, or the URL might be incorrect. Please check the QR code or link again.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleDownload = async () => {
    if (!captureRef.current || !cert) return;
    setIsDownloading(true);
    try {
      // Need a tiny delay for React to render the hidden component 
      // if it wasn't rendered yet (though it should be).
      await new Promise(res => setTimeout(res, 100));

      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: null,
        width: 1122,
        height: 794,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const w = pdf.internal.pageSize.getWidth();
      const h = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'JPEG', 0, 0, w, h);
      
      if (cert.referenceNo) {
        pdf.link(0, 195, 297, 15, { url: `https://unnati.ir/verify/${cert.referenceNo}` });
      }

      const pdfBlobUrl = pdf.output('bloburl');
      window.open(pdfBlobUrl, '_blank');
    } catch (err) {
      console.error('Download failed', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 flex items-center justify-center relative overflow-hidden">
      {/* Hidden full-res capture canvas */}
      <div style={{ position: 'fixed', top: '-9999px', left: '-9999px', zIndex: -1, pointerEvents: 'none' }}>
        <CertificateCanvas ref={captureRef} data={cert} />
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-green-400/10 rounded-full blur-[80px]" />

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Verification Status Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full shadow-lg shadow-green-600/20 mb-6">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Verified Certificate
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-bold shadow-sm">
            <CheckCircle className="w-4 h-4" />
            Authenticity Confirmed
          </div>
        </div>

        {/* Certificate Card */}
        <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-xl bg-white/80">
          <div className="bg-[#0B1F5E] p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay"></div>
            <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4 relative z-10" />
            <h2 className="text-2xl font-bold text-white relative z-10 tracking-widest uppercase">
              {cert.appreciationType || 'OF APPRECIATION'}
            </h2>
          </div>

          <div className="p-8 sm:p-10">
            <div className="space-y-6">
              
              <div className="text-center pb-6 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Awarded To</p>
                <h3 className="text-2xl font-bold text-gray-900">{cert.recipientName}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                
                {cert.referenceNo && (
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                      <Hash className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Reference No.</p>
                      <p className="font-bold text-gray-900 mt-0.5">{cert.referenceNo}</p>
                    </div>
                  </div>
                )}

                {cert.rollNo && (
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Roll Number</p>
                      <p className="font-bold text-gray-900 mt-0.5">{cert.rollNo}</p>
                    </div>
                  </div>
                )}

                {cert.team && (
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Team / Role</p>
                      <p className="font-bold text-gray-900 mt-0.5">{cert.team}</p>
                    </div>
                  </div>
                )}

                {cert.issuedAt && (
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Issue Date</p>
                      <p className="font-bold text-gray-900 mt-0.5">
                        {format(new Date(cert.issuedAt), 'MMMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 font-medium">
              Verified by Unnati Society, IIIT Bhagalpur
            </p>
            <Link to="/" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Learn More &rarr;
            </Link>
          </div>
          
          <div className="bg-white px-8 py-5 border-t border-gray-100 flex justify-center">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg shadow-blue-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {isDownloading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Preparing PDF...</>
              ) : (
                <><Eye className="w-5 h-5" /> View Certificate</>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
