import React from 'react';
import logoImage from '../assets/logo.png';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  invert?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 32,
  showText = true,
  invert = false,
}) => (
  <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
    <img
      src={logoImage}
      alt=""
      width={size}
      height={size}
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
    {showText && (
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.0625rem] font-semibold tracking-[-0.01em] ${
            invert ? 'text-white' : 'text-navy'
          }`}
        >
          Data Diplomats
        </span>
        <span
          className={`mt-1 text-[0.5625rem] font-semibold uppercase tracking-[0.16em] ${
            invert ? 'text-white/60' : 'text-slate-500'
          }`}
        >
          For Nonprofits
        </span>
      </span>
    )}
  </span>
);
