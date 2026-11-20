import React, { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ src, alt, title, className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#24132B] via-[#3A1C42] to-[#0D9488] text-white p-6 text-center ${className}`}
      >
        <svg
          className="w-8 h-8 mb-2 opacity-80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden="true"
        >
          <path d="M4 17l5-5 4 4 7-7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 9h5v5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-display text-sm font-semibold tracking-tight opacity-90">
          {title || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
