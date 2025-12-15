import { getLatestContent } from '@/lib/content';
import type { Category } from '@/lib/types';
import HomepageItemCard from '@/components/content/homepage-item-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, User } from 'lucide-react';

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

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
          JSON Portfolio
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          A minimal, fast personal portfolio & publishing website using Firebase Hosting where content comes ONLY from JSON files in the repository.
        </p>
        <div className="mt-8 flex justify-center">
            <Button asChild>
                <Link href="/about">
                    <User className="mr-2" />
                    About Me
                    <ArrowRight className="ml-2" />
                </Link>
            </Button>
        </div>
      </section>

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
              <div className="grid md:grid-cols-2 gap-8">
                 {items.map(item => {
                    const image = PlaceHolderImages.find(img => img.id === item.thumbnail);
                    return <HomepageItemCard key={item.id} item={item} category={category} image={image} />;
                 })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
