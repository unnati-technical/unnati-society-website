import React, { useId } from "react";

/**
 * FramedBrushPhoto
 * Renders an image with Unnati's signature decorative frame:
 * - 4x4 soft blue dots matrix in top-left
 * - Overlapping squiggly / swirl rings in bottom-left
 * - Rounded light-blue outer boundary border
 * - SVG turbulence & displacement map brush-stroke rough edge mask on the inner photo
 */
const FramedBrushPhoto = ({
  src,
  alt = "Unnati event photograph",
  id: customId,
  aspectRatio = "aspect-[16/10]",
  className = "",
  imgClassName = "",
  caption,
  showDots = true,
  showSquiggle = true,
  scale = 18,
  onError,
}) => {
  const generatedId = useId().replace(/:/g, "_");
  const uniqueId = customId || `brush_${generatedId}`;
  const filterId = `brush_filter_${uniqueId}`;
  const maskId = `brush_mask_${uniqueId}`;

  return (
    <div className={`relative w-full flex items-center justify-center p-1.5 sm:p-2.5 ${className}`}>
      {/* Blue Dots Grid (Top Left) */}
      {showDots && (
        <div className="absolute -top-1.5 -left-1 sm:-top-2 sm:-left-2 grid grid-cols-4 gap-1.5 sm:gap-2 opacity-90 z-20 pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#7EA4F4]"
            />
          ))}
        </div>
      )}

      {/* Squiggly Loops (Bottom Left) */}
      {showSquiggle && (
        <svg
          className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-32 sm:w-44 h-20 sm:h-26 text-[#8BA9F9] opacity-35 z-0 pointer-events-none"
          viewBox="0 0 200 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 60,10 C 30,15 10,70 30,85 C 50,100 70,50 40,40 C 10,30 5,95 45,95 C 85,95 105,40 75,35 C 45,30 50,90 90,95 C 130,100 150,50 120,40 C 90,30 90,85 130,85 C 170,85 190,70 200,60" />
        </svg>
      )}

      {/* Outer Rounded Light Blue Decorative Frame with Minimal Tight Margin */}
      <div className="relative w-full rounded-[20px] sm:rounded-[24px] border-[3px] sm:border-[3.5px] border-[#D1E0FF] p-1 sm:p-1.5 bg-white shadow-xs z-10">

        {/* Inner Container with SVG Brush Stroke Mask */}
        <div className={`relative w-full ${aspectRatio} overflow-hidden rounded-[16px] sm:rounded-[20px] bg-slate-50`}>
          {/* SVG Definition for Brush Stroke Mask */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <filter
                id={filterId}
                x="-10%"
                y="-10%"
                width="120%"
                height="120%"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.04 0.15"
                  numOctaves="3"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale={scale}
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
              <mask id={maskId}>
                <rect
                  x="0.6%"
                  y="0.6%"
                  width="98.8%"
                  height="98.8%"
                  fill="white"
                  filter={`url(#${filterId})`}
                />
              </mask>
            </defs>
          </svg>

          {/* Actual Image with CSS Mask */}
          <img
            loading="lazy"
            src={src}
            alt={alt}
            onError={onError}
            className={`w-full h-full object-cover block bg-white transform hover:scale-105 transition-transform duration-700 ease-out ${imgClassName}`}
            style={{
              mask: `url(#${maskId})`,
              WebkitMask: `url(#${maskId})`,
              maskSize: "cover",
              WebkitMaskSize: "cover",
            }}
          />

          {/* Optional Caption Overlay */}
          {caption && (
            <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 rounded-lg bg-black/65 backdrop-blur-md text-white text-[11px] sm:text-xs z-20 pointer-events-none">
              <span>{caption}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FramedBrushPhoto;
