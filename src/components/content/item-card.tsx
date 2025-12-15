import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { PortfolioItem, Category } from '@/lib/types';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Calendar, ArrowRight } from 'lucide-react';
import StarRating from '../ui/star-rating';
import { Badge } from '../ui/badge';

interface ItemCardProps {
  item: PortfolioItem;
  category: Category;
  image?: ImagePlaceholder;
}

export default function ItemCard({ item, category, image }: ItemCardProps) {
  const itemUrl = `/${category}/${item.id}`;

  return (
    <Card className="flex flex-col md:flex-row overflow-hidden h-full transition-shadow hover:shadow-lg">
      {image && (
        <div className="w-full md:w-1/3 aspect-video md:aspect-auto relative shrink-0">
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
      <div className="flex flex-col flex-grow">
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
            <p className="text-muted-foreground line-clamp-2">{item.intro}</p>
            </CardContent>
            <div className="p-0 flex justify-between items-center gap-4 mt-auto text-sm text-muted-foreground">
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
        </div>
        <CardFooter className="p-6 pt-0 flex flex-wrap-reverse justify-between items-end gap-4">
            {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                        <Link key={tag} href={`/${category}?tags=${tag}`} passHref>
                            <Badge variant="secondary" className="text-xs hover:bg-accent hover:text-accent-foreground cursor-pointer">
                                {tag}
                            </Badge>
                        </Link>
                    ))}
                </div>
            )}
            <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary -ml-4 self-end">
                <Link href={itemUrl}>
                Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
