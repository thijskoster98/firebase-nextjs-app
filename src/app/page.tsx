import { getLatestContent } from '@/lib/content';
import type { Category } from '@/lib/types';
import ItemCard from '@/components/content/item-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const categoryDisplayNames: Record<Category, string> = {
  projects: 'Projects',
  essays: 'Essays',
  reviews: 'Reviews',
  memos: 'Memos',
};

export default async function Home() {
  const latestContent = await getLatestContent();
  const categories = Object.keys(latestContent).filter(
    (key) => latestContent[key as Category] && latestContent[key as Category]!.length > 0
  ) as Category[];

  const bannerImage = PlaceHolderImages.find((img) => img.id === 'homepage-banner');
  const authorImage = PlaceHolderImages.find((img) => img.id === 'author-portrait');

  return (
    <>
      {bannerImage && (
        <section className="relative w-full h-64 md:h-80 shadow-inner">
          <Image
            src={bannerImage.imageUrl}
            alt={bannerImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={bannerImage.imageHint}
          />
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </section>
      )}

      <section className="bg-muted">
        <div className="container px-4 py-12 md:py-20 grid md:grid-cols-3 gap-8 md:gap-12 items-center">
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              A Personal Space for Ideas & Work
            </h1>
            <div className="prose prose-lg dark:prose-invert max-w-none columns-1 md:columns-2 gap-x-8">
              <p>
                Hello! I'm a passionate developer with a love for clean code, elegant design, and building things for the web. My journey into technology started with a fascination for how software can solve real-world problems.
              </p>
              <p>
                This website is a personal project where I explore different technologies and share my thoughts on design, development, and everything in between. It's built on a foundation of simplicity, using Next.js and Tailwind CSS, with all content managed through simple JSON files in a Git repository.
              </p>
            </div>
             <p className="font-headline text-2xl mt-6 text-right mr-4">- John Doe</p>
          </div>
          <div className="md:col-span-1 flex flex-col items-center -mt-32">
            {authorImage && (
              <div className="relative aspect-square w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-lg mb-4 ring-4 ring-background">
                <Image
                  src={authorImage.imageUrl}
                  alt="Author Portrait"
                  fill
                  className="object-cover"
                  data-ai-hint={authorImage.imageHint}
                />
              </div>
            )}
             <Button asChild variant="outline">
                <Link href="/about">
                    More About Me
                    <ArrowRight className="ml-2" />
                </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="space-y-16">
          {categories.map((category) => {
            const items = latestContent[category];
            if (!items || items.length === 0) return null;
            
            return (
              <section key={category}>
                <div className="flex justify-between items-center mb-6 border-b pb-2">
                  <h2 className="text-3xl font-bold">
                    Latest {categoryDisplayNames[category]}
                  </h2>
                  <Button asChild variant="ghost">
                      <Link href={`/${category}`}>
                          View All <ArrowRight className="ml-2" />
                      </Link>
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
                  {items.map(item => {
                      const image = PlaceHolderImages.find(img => img.id === item.thumbnail);
                      return <ItemCard key={item.id} item={item} category={category} image={image} showTags={true} />;
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
