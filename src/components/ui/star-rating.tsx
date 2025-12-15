import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  className?: string;
  size?: number;
}

export default function StarRating({ rating, totalStars = 5, className, size = 5 }: StarRatingProps) {
  const stars = [];
  const starClasses = `h-${size} w-${size}`;
  const fullStarColor = "text-amber-400";
  const emptyStarColor = "text-muted-foreground/50";

  for (let i = 1; i <= totalStars; i++) {
    if (i <= rating) {
      stars.push(<Star key={`full-${i}`} className={cn(starClasses, fullStarColor)} fill="currentColor" />);
    } else if (i - 0.5 <= rating) {
      stars.push(<StarHalf key={`half-${i}`} className={cn(starClasses, fullStarColor)} fill="currentColor" />);
    } else {
      stars.push(<Star key={`empty-${i}`} className={cn(starClasses, emptyStarColor)} fill="currentColor" />);
    }
  }

  return <div className={cn("flex items-center gap-1", className)}>{stars}</div>;
}
