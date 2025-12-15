import { getLatestContent } from '@/lib/content';
import type { Category } from '@/lib/types';
import ItemCard from '@/components/content/item-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries';
import Signature from '@/components/ui/signature';

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  const latestContent = await getLatestContent(lang);
  const dict = await getDictionary(lang);
  
  const categoryDisplayNames: Record<Category, string> = {
    projects: dict.header.projects,
    essays: dict.header.essays,
    reviews: dict.header.reviews,
    memos: dict.header.memos,
  };

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
        <div className="container px-4 py-8 md:py-12 grid md:grid-cols-3 gap-8 md:gap-12 items-center">
          <div className="md:col-span-2 order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              {dict.homepage.title}
            </h1>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                {dict.homepage.intro_p1}
              </p>
              <p>
                {dict.homepage.intro_p2}
              </p>
            </div>
            <div className="flex justify-end mt-6 mr-4">
             <Signature className="h-12 w-auto text-foreground" />
            </div>
          </div>
          <div className="md:col-span-1 flex flex-col items-center order-1 md:order-2 -mt-32 md:-mt-80">
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
             <div className="flex flex-col items-center space-y-2 w-full max-w-[16rem] mx-auto">
                <Button asChild variant="outline" className="w-48">
                    <Link href={`/${lang}/about`}>
                        {dict.homepage.more_about_me}
                        <ArrowRight className="ml-2" />
                    </Link>
                </Button>
                <Button asChild variant="outline" className="w-48">
                    <Link href={`/${lang}/cv-contact`}>
                        {dict.homepage.cv_contact}
                        <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
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
                    {dict.homepage.latest} {categoryDisplayNames[category]}
                  </h2>
                  <Button asChild variant="ghost">
                      <Link href={`/${lang}/${category}`}>
                          View All <ArrowRight className="ml-2" />
                      </Link>
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
                  {items.map(item => {
                      const image = PlaceHolderImages.find(img => img.id === item.thumbnail);
                      return <ItemCard key={item.id} item={item} category={category} image={image} lang={lang} dict={dict} showTags={true} />;
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
