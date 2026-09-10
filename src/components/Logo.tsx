import React from 'react';
import logoImage from '../assets/logo.png';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  theme?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 40,
  showText = true,
  theme = 'light',
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Brand mark: Statue of Liberty silhouette surrounded by networked orange nodes */}
      <img
        src={logoImage}
        alt="Data Diplomats for Nonprofits logo"
        width={size}
        height={size}
        className="shrink-0 transition-transform duration-300 hover:scale-105 object-contain"
        style={{ width: size, height: size }}
      />

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-extrabold tracking-tight text-lg sm:text-xl uppercase ${
                theme === 'dark' ? 'text-white' : 'text-[#0A192F]'
              }`}
            >
              Data Diplomats
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded font-mono font-bold bg-[#FF6B35]/15 text-[#FF6B35] tracking-wide">
              501(c)(3)
            </span>
          </div>
          <span
            className={`text-[11px] font-medium tracking-wider uppercase ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            For Nonprofits, Inc. <span className="text-[#FF6B35] font-semibold">· The Ode of Nonprofits</span>
          </span>
        </div>
      )}
    </div>
  );
};
