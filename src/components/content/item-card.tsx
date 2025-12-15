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
  showTags?: boolean;
}

export default function ItemCard({ item, category, image, showTags = false }: ItemCardProps) {
  const itemUrl = `/${category}/${item.id}`;

  return (
    <Card className="group flex flex-col overflow-hidden h-full transition-shadow hover:shadow-lg">
        <div className="flex flex-col md:flex-row flex-grow">
            {image && (
                <div className="w-full md:w-2/5 aspect-video md:aspect-auto relative shrink-0">
                <Link href={itemUrl} className="block h-full">
                    <Image
                    src={image.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <Button asChild variant="outline" className="bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={itemUrl}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    </div>
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
        </div>
        {showTags && item.tags && item.tags.length > 0 && (
            <CardFooter className="p-6 pt-4 flex flex-wrap gap-2 border-t mt-auto">
                {item.tags.map((tag) => (
                    <Link key={tag} href={`/${category}?tags=${tag}`} passHref>
                        <Badge variant="secondary" className="text-xs hover:bg-accent hover:text-accent-foreground cursor-pointer">
                            {tag}
                        </Badge>
                    </Link>
                ))}
            </CardFooter>
        )}
    </Card>
  );
}