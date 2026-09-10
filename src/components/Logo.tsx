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
  size = 30,
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
          className={`text-[0.9375rem] tracking-[-0.02em] ${
            invert ? 'text-bone' : 'text-cola'
          }`}
        >
          Data Diplomats
        </span>
        <span
          className={`mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.14em] ${
            invert ? 'text-bone/55' : 'text-cola/45'
          }`}
        >
          For Nonprofits
        </span>
      </span>
    )}
  </span>
);
