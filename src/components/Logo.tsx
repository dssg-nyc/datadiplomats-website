import React from 'react';

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
      {/* Precision Vector Logo rendering the Statue of Liberty surrounded by networked orange nodes */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Outer Connection Network Lines */}
        <line x1="28" y1="36" x2="16" y2="30" stroke="#FF6B35" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="72" y1="41" x2="86" y2="38" stroke="#FF6B35" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="37" y1="73" x2="28" y2="82" stroke="#FF6B35" strokeWidth="4.5" strokeLinecap="round" />

        {/* Network Nodes (Circles) */}
        <circle cx="15" cy="29" r="6" fill="#FF6B35" />
        <circle cx="87" cy="38" r="6" fill="#FF6B35" />
        <circle cx="28" cy="82" r="6.5" fill="#FF6B35" />

        {/* Main Orange Orbital Ring */}
        <circle cx="50" cy="50" r="28" stroke="#FF6B35" strokeWidth="4.8" fill="none" />

        {/* Navy Statue of Liberty Graphic Silhouette */}
        <g id="statue-liberty" fill="#0A192F">
          {/* Torch Arm & Flame */}
          <path
            d="M39 12 C37 10 39 8 41 8 C43 8 44 9 44 11 C45 9 47 9 47 11 C46 14 43 16 41 18 C40 18 39 15 39 12 Z"
            fill="#0A192F"
          />
          {/* Torch Base */}
          <rect x="36" y="18" width="10" height="4" rx="1" fill="#0A192F" />
          {/* Arm extending up */}
          <path
            d="M37 22 L44 22 L42 38 L37 36 Z"
            fill="#0A192F"
          />
          {/* Crown Spikes */}
          <polygon points="50,29 51,39 49,39" fill="#0A192F" />
          <polygon points="55,30 54,41 52,40" fill="#0A192F" />
          <polygon points="60,33 56,43 54,42" fill="#0A192F" />
          <polygon points="65,39 58,45 56,43" fill="#0A192F" />
          <polygon points="45,31 48,40 46,40" fill="#0A192F" />
          <polygon points="41,34 46,42 44,42" fill="#0A192F" />
          <polygon points="38,39 44,45 42,45" fill="#0A192F" />

          {/* Head & Facial Profile */}
          <path
            d="M45 40 C45 37 55 37 55 40 C55 42 53 44 54 47 C52 47 50 46 48 49 C47 51 49 53 52 54 C54 54 55 57 53 60 C50 60 48 57 47 54 C46 51 45 47 45 40 Z"
            fill="#0A192F"
          />

          {/* Robe, Bust & Shoulders */}
          <path
            d="M36 60 C36 50 40 43 45 43 C48 43 51 46 54 48 C58 48 62 55 64 63 C67 70 66 76 60 76 C52 76 43 76 38 72 C36 68 36 64 36 60 Z"
            fill="#0A192F"
          />
        </g>
      </svg>

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
