import { cn } from '@/lib/utils';

export const GBFlag = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 36"
    className={cn("h-auto", className)}
  >
    <clipPath id="a">
      <path d="M0 0h60v36H0z" />
    </clipPath>
    <clipPath id="b">
      <path d="M30 18 60 36V0L0 36z" />
    </clipPath>
    <g clipPath="url(#a)">
      <path d="M0 0v36h60V0z" fill="#012169" />
      <path d="M0 0L60 36m0-36L0 36" stroke="#fff" strokeWidth="7.2" />
      <path
        d="M0 0L60 36m0-36L0 36"
        clipPath="url(#b)"
        stroke="#C8102E"
        strokeWidth="4.8"
      />
      <path d="M30 0v36M0 18h60" stroke="#fff" strokeWidth="12" />
      <path d="M30 0v36M0 18h60" stroke="#C8102E" strokeWidth="7.2" />
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
