import { cn } from '@/lib/utils';

export const GBFlag = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 36"
    className={cn("h-auto", className)}
  >
    <path fill="#012169" d="M0 0h60v36H0z"/>
    <path fill="#FFF" d="m60 36-30-18-30 18V0h30v18zM0 0l30 18L60 0v36H30z"/>
    <path fill="#C8102E" d="m60 36-3-1.8V0h3zM0 0l3 1.8V36H0zM25.5 18H0v3h25.5zM60 15H34.5v3H60z"/>
    <path fill="#FFF" d="M0 36V0h60v36z"/>
    <path fill="#C8102E" d="M0 15h60v6H0z"/>
    <path fill="#FFF" d="M24 0h12v36H24z"/>
    <path fill="#C8102E" d="M27 0h6v36h-6z"/>
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
