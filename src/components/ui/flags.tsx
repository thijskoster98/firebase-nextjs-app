import { cn } from '@/lib/utils';

export const GBFlag = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 36"
    className={cn("h-auto", className)}
  >
    <rect width="60" height="36" fill="#fff" />
    <path fill="#C8102E" d="M24 0h12v36H24z" />
    <path fill="#C8102E" d="M0 15h60v6H0z" />
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
