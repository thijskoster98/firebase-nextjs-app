import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { PortfolioItem, Category } from '@/lib/types';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Calendar, ArrowRight } from 'lucide-react';
import StarRating from '../ui/star-rating';

interface ItemCardProps {
  item: PortfolioItem;
  category: Category;
  image?: ImagePlaceholder;
}

export default function ItemCard({ item, category, image }: ItemCardProps) {
  const itemUrl = `/${category}/${item.id}`;

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-shadow hover:shadow-lg">
      {image && (
        <div className="w-full aspect-video relative shrink-0">
          <Link href={itemUrl} className="block h-full">
            <Image
              src={image.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          </Link>
        </div>
      )}
      <div className="flex flex-col flex-grow p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-xl font-bold">
            <Link href={itemUrl}>{item.title}</Link>
          </CardTitle>
          {item.subtitle && (
            <CardDescription className="text-md">{item.subtitle}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex-grow p-0 mb-4">
          <p className="text-muted-foreground line-clamp-3">{item.intro}</p>
        </CardContent>
        <CardFooter className="p-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
            </div>
            {item.rating !== undefined && category === 'reviews' && (
                <StarRating rating={item.rating} size={4}/>
            )}
          </div>
          <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary -mr-4">
            <Link href={itemUrl}>
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
