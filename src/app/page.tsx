import { getLatestContent } from '@/lib/content';
import type { Category } from '@/lib/types';
import ItemCard from '@/components/content/item-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const categoryDisplayNames: Record<Category, string> = {
  projects: 'Projects',
  essays: 'Essays',
  reviews: 'Reviews',
  memos: 'Memos',
};

export default async function Home() {
  const latestContent = await getLatestContent();
  const categories = Object.keys(latestContent).filter(
    (key) => latestContent[key as Category]
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
      </section>

      <div className="space-y-16">
        {categories.map((category) => {
          const item = latestContent[category];
          if (!item) return null;
          const image = PlaceHolderImages.find(img => img.id === item.thumbnail);
          return (
            <section key={category}>
              <h2 className="text-3xl font-bold mb-6 border-b pb-2">
                Latest {categoryDisplayNames[category]}
              </h2>
              <div className="max-w-4xl mx-auto">
                 <ItemCard item={item} category={category} image={image}/>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
