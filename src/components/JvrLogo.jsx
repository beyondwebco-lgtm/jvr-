import React from 'react';

export default function JvrLogo({ theme = 'light', size = 'md', className = '' }) {
  const heightClasses =
    size === 'lg'
      ? 'h-16 sm:h-20'
      : size === 'sm'
      ? 'h-11 sm:h-12'
      : 'h-14 sm:h-16';

  const img = (
    <img
      src="/images/jvr-logo.png"
      alt="JVR Mining and Services — Powering Progress Through Professional Earthwork Solutions"
      width={1024}
      height={512}
      className={`${heightClasses} w-auto object-contain select-none ${className}`}
    />
  );

  if (theme === 'dark') {
    return (
      <div className="inline-flex items-center bg-white rounded-sm px-3.5 py-2 shadow-md border border-slate-200/80">
        {img}
      </div>
    );
  }

  return <div className="inline-flex items-center">{img}</div>;
}
