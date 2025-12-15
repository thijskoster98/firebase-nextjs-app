import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { PortfolioItem, Category } from '@/lib/types';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Calendar, ArrowRight, Languages } from 'lucide-react';
import StarRating from '../ui/star-rating';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface ItemCardProps {
  item: PortfolioItem;
  category: Category;
  image?: ImagePlaceholder;
  showTags?: boolean;
  lang: string;
  dict: any;
}

export default function ItemCard({ item, category, image, showTags = false, lang, dict }: ItemCardProps) {
  const itemUrl = `/${lang}/${category}/${item.id}`;
  const availableLanguages = ['en', ...(Object.keys(item.translations || {}))];

  return (
    <div className="flex flex-col h-full">
      <Card className="group flex flex-col overflow-hidden h-full transition-shadow hover:shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row flex-grow">
          {image && (
            <div className="w-full md:w-2/5 aspect-video md:aspect-square relative shrink-0">
              <Link href={itemUrl} className="block h-full group/image">
                <Image
                  src={image.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <Button asChild variant="outline" className="bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={itemUrl}>
                      {dict.item_card.read_more} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Link>
            </div>
          )}
          <div className="flex flex-col p-6 flex-grow">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-bold">
                <Link href={itemUrl}>{item.title}</Link>
              </CardTitle>
              {item.subtitle && (
                <CardDescription className="text-md">{item.subtitle}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="p-0 flex-grow">
              <p className="text-muted-foreground line-clamp-3">{item.intro}</p>
            </CardContent>
            <div className="p-0 flex justify-between items-center gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(item.date).toLocaleDateString(lang, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              {item.rating !== undefined && category === 'reviews' && (
                <StarRating rating={item.rating} size={4} />
              )}
            </div>
            {item.translations && (
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Languages className="mr-1 h-4 w-4" />
                    {availableLanguages.map(langCode => (
                        <Link key={langCode} href={`/${langCode}/${category}/${item.id}`} passHref>
                            <Badge variant={lang === langCode ? 'default' : 'secondary'} className="cursor-pointer">
                                {langCode.toUpperCase()}
                            </Badge>
                        </Link>
                    ))}
                </div>
            )}
          </div>
        </div>
      </Card>
      <div className={cn("mt-4 flex flex-wrap gap-2", !showTags && "invisible")}>
        {item.tags?.map((tag) => (
          <Link key={tag} href={`/${lang}/${category}?tags=${tag}`} passHref>
            <Badge variant="secondary" className="text-xs hover:bg-accent hover:text-accent-foreground cursor-pointer">
              {tag}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
