import { cn } from '@/lib/utils';

export const GBFlag = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 60 40" 
        className={cn("h-auto", className)}
    >
        <clipPath id="a">
            <path d="M0 0v40h60V0z"/>
        </clipPath>
        <rect width="60" height="40" fill="#00247d"/>
        <g clipPath="url(#a)">
            <path d="M0 0l60 40m0-40L0 40" stroke="#fff" strokeWidth="6"/>
            <path d="M0 0l60 40m0-40L0 40" stroke="#cf142b" strokeWidth="4"/>
            <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30 0v40M0 20h60" stroke="#cf142b" strokeWidth="6"/>
        </g>
    </svg>
);


export const NLFlag = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 9 6"
    className={cn("h-auto", className)}
  >
    <path fill="#21468B" d="M0 0h9v6H0z" />
    <path fill="#fff" d="M0 0h9v4H0z" />
    <path fill="#AE1C28" d="M0 0h9v2H0z" />
  </svg>
);
