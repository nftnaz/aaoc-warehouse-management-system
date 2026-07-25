import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'full' }) => {
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {/* Gabon Red Drop Emblem */}
        <div className="relative w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white shadow-sm font-bold text-xs">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        </div>
        {/* AAOC Blue Drop Emblem */}
        <div className="relative w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white shadow-sm font-bold text-xs">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2.15l-5 6.5A7 7 0 1 0 17 8.65l-5-6.5z" />
          </svg>
        </div>
        <div>
          <span className="font-extrabold text-blue-900 tracking-tight text-lg">AAOC</span>
          <span className="text-[10px] block text-slate-500 font-semibold leading-none">GABON OIL CO. (IO)</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center bg-white p-2 rounded-md shadow-sm border border-slate-200 ${className}`}>
      <div className="flex items-center gap-3 md:gap-5">
        {/* GABON OIL COMPANY Emblem & Text */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white shadow-inner p-1">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="50" cy="50" r="46" stroke="white" strokeWidth="4"/>
              <path d="M50 15 C30 40 25 60 50 85 C75 60 70 40 50 15 Z" fill="white"/>
              <path d="M50 30 C40 48 38 60 50 75 C62 60 60 48 50 30 Z" fill="#DC2626"/>
            </svg>
          </div>
          <div className="text-left leading-tight">
            <div className="font-black text-slate-800 text-sm tracking-wide">
              GABON <span className="text-slate-900 font-normal">OiL</span>
            </div>
            <div className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">
              COMPANY
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-8 w-[1px] bg-slate-300"></div>

        {/* AAOC Emblem & Text */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
              <path d="M50 10 C30 40 22 62 50 90 C78 62 70 40 50 10 Z" fill="#024097"/>
              <path d="M42 28 C34 44 32 54 44 72 C38 65 36 50 42 28 Z" fill="white" opacity="0.8"/>
            </svg>
          </div>
          <div className="text-left leading-tight">
            <div className="font-extrabold text-[#024097] text-2xl tracking-tight leading-none">
              AAOC
            </div>
            <div className="text-[8px] font-bold text-[#024097] tracking-wider uppercase">
              ARAB AFRICAN OIL COMPANY
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Subtitle Line */}
      <div className="w-full mt-1 pt-0.5 border-t border-slate-200 text-center">
        <span className="text-xs md:text-sm font-black text-[#1E50C0] tracking-wider uppercase">
          INTEGRATED ORGANIZATION - (IO)
        </span>
      </div>
    </div>
  );
};
