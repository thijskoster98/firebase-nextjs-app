import { cn } from '@/lib/utils';

export const GBFlag = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 30"
    className={cn(className)}
  >
    <clipPath id="a">
      <path d="M0 0h60v30H0z" />
    </clipPath>
    <clipPath id="b">
      <path d="M30 15 60 30V0L0 30z" />
    </clipPath>
    <g clipPath="url(#a)">
      <path d="M0 0v30h60V0z" fill="#012169" />
      <path d="M0 0L60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0 0L60 30m0-30L0 30"
        clipPath="url(#b)"
        stroke="#C8102E"
        strokeWidth="4"
      />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

export const NLFlag = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 9 6"
    className={cn(className)}
  >
    <path fill="#21468B" d="M0 0h9v6H0z" />
    <path fill="#fff" d="M0 0h9v4H0z" />
    <path fill="#AE1C28" d="M0 0h9v2H0z" />
  </svg>
);
