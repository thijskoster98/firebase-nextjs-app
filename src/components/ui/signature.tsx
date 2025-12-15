import { cn } from '@/lib/utils';

const Signature = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 458 178"
      className={cn(className)}
      fill="currentColor"
    >
      <text 
        x="50%" 
        y="50%" 
        dominantBaseline="middle" 
        textAnchor="middle" 
        fontFamily="cursive, sans-serif" 
        fontSize="60"
      >
        Signature
      </text>
    </svg>
  );
};

export default Signature;
