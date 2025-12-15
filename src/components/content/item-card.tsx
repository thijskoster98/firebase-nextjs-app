import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { PortfolioItem, Category } from '@/lib/types';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Calendar, ArrowRight } from 'lucide-react';
import StarRating from '../ui/star-rating';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { GBFlag, NLFlag } from '@/components/ui/flags';

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
                  <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {dict.item_card.read_more} <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
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
            
            <div className="flex items-center gap-2 mt-2">
                {availableLanguages.map(langCode => {
                    const Flag = langCode === 'nl' ? NLFlag : GBFlag;
                    const flagUrl = `/${langCode}/${category}/${item.id}`;
                    return (
                        <Link key={langCode} href={flagUrl} passHref>
                           <Flag className={cn("w-6 rounded-sm cursor-pointer transition-opacity hover:opacity-80", lang === langCode && "ring-2 ring-primary ring-offset-2 ring-offset-background")} />
                        </Link>
                    )
                })}
            </div>
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
