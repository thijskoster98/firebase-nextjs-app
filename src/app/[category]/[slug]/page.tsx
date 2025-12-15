import { getContent, getContentBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Category } from '@/lib/types';
import { CATEGORIES } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import StarRating from '@/components/ui/star-rating';
import { Calendar } from 'lucide-react';

export async function generateStaticParams() {
  const params: { category: Category; slug: string }[] = [];
  for (const category of CATEGORIES) {
    const items = await getContent(category);
    for (const item of items) {
      params.push({ category, slug: item.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { category: Category; slug: string } }) {
    const item = await getContentBySlug(params.category, params.slug);
    if (!item) {
        return { title: 'Not Found' }
    }
    return {
      title: `${item.title} | JSON Portfolio`,
      description: item.intro,
    }
}

export default async function PostPage({ params }: { params: { category: Category; slug: string } }) {
  if (!CATEGORIES.includes(params.category)) {
    notFound();
  }

  const item = await getContentBySlug(params.category, params.slug);

  if (!item) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === item.thumbnail);

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
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </div>
            {item.rating !== undefined && params.category === 'reviews' && (
                <StarRating rating={item.rating} />
            )}
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
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">TAGS</h3>
            <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                    <Link key={tag} href={`/${params.category}?tags=${tag}`} passHref>
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
