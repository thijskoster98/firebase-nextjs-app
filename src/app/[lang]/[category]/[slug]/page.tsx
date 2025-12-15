import { getContent, getContentBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Category } from '@/lib/types';
import { CATEGORIES } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import StarRating from '@/components/ui/star-rating';
import { Calendar, User } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries';
import { GBFlag, NLFlag } from '@/components/ui/flags';
import { cn } from '@/lib/utils';

export async function generateStaticParams() {
  const params: { lang: string; category: Category; slug: string }[] = [];
  const locales = ['en', 'nl'];
  for (const lang of locales) {
    for (const category of CATEGORIES) {
      const items = await getContent(category, 'en'); 
      for (const item of items) {
        params.push({ lang, category, slug: item.id });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { lang: string; category: Category; slug: string } }) {
    const item = await getContentBySlug(params.category, params.slug, params.lang);
    if (!item) {
        return { title: 'Not Found' }
    }
    return {
      title: `${item.title} | JSON Portfolio`,
      description: item.intro,
    }
}

export default async function PostPage({ params }: { params: { lang: string; category: Category; slug: string } }) {
  if (!CATEGORIES.includes(params.category)) {
    notFound();
  }

  const item = await getContentBySlug(params.category, params.slug, params.lang);
  const dict = await getDictionary(params.lang);

  if (!item) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === item.thumbnail);
  const availableLanguages = ['en', ...(Object.keys(item.translations || {}))];


  return (
    <article className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
      <header className="mb-8">
        {image && (
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-8 shadow-lg">
            <Image
              src={image.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={image.imageHint}
            />
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3">
          {item.title}
        </h1>
        {item.subtitle && (
          <p className="text-xl md:text-2xl text-muted-foreground font-light mb-6">
            {item.subtitle}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-muted-foreground">
            <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(item.date).toLocaleDateString(params.lang, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </div>
            <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <Link href={`/${params.lang}/about`} className="hover:text-primary">
                    {dict.post_page.author}
                </Link>
            </div>
            {item.rating !== undefined && params.category === 'reviews' && (
                <StarRating rating={item.rating} />
            )}
            <div className="flex items-center gap-2">
                {availableLanguages.map(langCode => {
                    const Flag = langCode === 'nl' ? NLFlag : GBFlag;
                    const flagUrl = `/${langCode}/${params.category}/${params.slug}`;
                    return (
                        <Link key={langCode} href={flagUrl} passHref>
                           <Flag className={cn("h-6 w-6 rounded-sm cursor-pointer border border-border/20 transition-opacity hover:opacity-80", params.lang === langCode && "ring-2 ring-primary ring-offset-2 ring-offset-background")} />
                        </Link>
                    )
                })}
            </div>
        </div>
      </header>

      {item.intro && (
        <p className="text-lg md:text-xl leading-relaxed border-l-4 border-primary pl-6 mb-8 italic">
          {item.intro}
        </p>
      )}

      <div
        className="prose prose-lg dark:prose-invert max-w-none prose-p:text-foreground/90 prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
      
      {item.tags && item.tags.length > 0 && (
        <footer className="mt-12 border-t pt-6">
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">{dict.post_page.tags}</h3>
            <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                    <Link key={tag} href={`/${params.lang}/${params.category}?tags=${tag}`} passHref>
                        <Badge variant="secondary" className="text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer">
                            {tag}
                        </Badge>
                    </Link>
                ))}
            </div>
        </footer>
      )}
    </article>
  );
}
