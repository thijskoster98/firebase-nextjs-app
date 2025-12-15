'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PortfolioItem, Category } from '@/lib/types';
import ItemCard from '@/components/content/item-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Search, X, ArrowRight } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Separator } from '../ui/separator';
import Signature from '../ui/signature';

interface CategoryClientPageProps {
  items: PortfolioItem[];
  category: Category;
  allTags: string[];
  lang: string;
  dict: any;
  categoryName: string;
}

type LanguageFilter = 'all' | 'en' | 'nl';

export default function CategoryClientPage({ items, category, allTags, lang, dict, categoryName }: CategoryClientPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTags = searchParams.get('tags');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags ? initialTags.split(',') : []);
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>('all');

  const bannerImage = PlaceHolderImages.find((img) => img.id === 'category-banner');
  const authorImage = PlaceHolderImages.find((img) => img.id === 'author-portrait');

  useEffect(() => {
    const newTags = searchParams.get('tags');
    setSelectedTags(newTags ? newTags.split(',') : []);
  }, [searchParams]);

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Language filtering
        if (languageFilter === 'en') {
          return !item.translations?.nl;
        }
        if (languageFilter === 'nl') {
          return !!item.translations?.nl;
        }
        return true; // 'all'
      })
      .filter((item) => {
        // Tag filtering
        if (selectedTags.length > 0) {
          if (!item.tags) return false;
          return selectedTags.every((tag) => item.tags.includes(tag));
        }
        return true;
      })
      .filter((item) => {
        // Search query filtering
        if (searchQuery.trim() === '') {
          return true;
        }
        const query = searchQuery.toLowerCase();
        const contentToSearch = [
          item.title,
          ...(item.tags || []),
          item.date,
          item.content,
          item.intro,
          item.subtitle,
        ]
          .join(' ')
          .toLowerCase();
        return contentToSearch.includes(query);
      });
  }, [items, searchQuery, selectedTags, languageFilter]);

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    const newParams = new URLSearchParams(window.location.search);
    if (newTags.length > 0) {
        newParams.set('tags', newTags.join(','));
    } else {
        newParams.delete('tags');
    }
    
    // Using router.push to update URL without full reload
    router.push(`/${lang}/${category}?${newParams.toString()}`);
  };

  const clearFilters = () => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.delete('tags');
    router.push(`/${lang}/${category}?${newParams.toString()}`);
  }

  return (
    <>
      <section className="relative w-full h-32 md:h-40 shadow-inner">
        {bannerImage && (
          <Image
            src={bannerImage.imageUrl}
            alt={bannerImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={bannerImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </section>

      <section className="bg-muted">
        <div className="container px-4 py-8 grid md:grid-cols-3 gap-8 md:gap-12 items-center">
          <div className="md:col-span-2 order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              {categoryName}
            </h1>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                {dict.category_page.intro.replace('{category}', categoryName.toLowerCase())}
              </p>
            </div>
             <Signature className="h-12 w-auto mt-6 text-foreground ml-auto block mr-4" />
          </div>
          <div className="md:col-span-1 flex flex-col items-center order-1 md:order-2 -mt-24 md:-mt-48">
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
             <div className="flex flex-col space-y-2 w-full max-w-[16rem] mx-auto">
                <Button asChild variant="outline">
                    <Link href={`/${lang}/about`}>
                        {dict.homepage.more_about_me}
                        <ArrowRight className="ml-2" />
                    </Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href={`/${lang}/cv-contact`}>
                        {dict.homepage.cv_contact}
                        <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8 sticky top-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 z-40">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder={dict.category_page.search_placeholder.replace('{category}', categoryName.toLowerCase())}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          <aside className="md:col-span-1 md:sticky top-32 self-start">
            <h3 className="text-lg font-semibold mb-4 text-foreground">{dict.category_page.filters}</h3>
            
            <Separator />
            
            <div className="py-6">
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground">{dict.category_page.filter_by_language}</h4>
              <div className="flex flex-col space-y-2">
                <Button variant={languageFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setLanguageFilter('all')} className="justify-start">
                  {dict.category_page.all_languages}
                </Button>
                <Button variant={languageFilter === 'en' ? 'default' : 'outline'} size="sm" onClick={() => setLanguageFilter('en')} className="justify-start">
                  {dict.category_page.english_only}
                </Button>
                <Button variant={languageFilter === 'nl' ? 'default' : 'outline'} size="sm" onClick={() => setLanguageFilter('nl')} className="justify-start">
                  {dict.category_page.dutch_only}
                </Button>
              </div>
            </div>

            <Separator />

            <div className="py-6">
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground">{dict.category_page.filter_by_tag}</h4>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleTag(tag)}
                    className="rounded-full"
                  >
                    {tag}
                    {selectedTags.includes(tag) && <X className="ml-2 h-4 w-4" />}
                  </Button>
                ))}
                {selectedTags.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full justify-center mt-2">
                        {dict.category_page.clear_filters}
                    </Button>
                )}
              </div>
            </div>

            <Separator />

          </aside>

          <main className="md:col-span-3">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const image = PlaceHolderImages.find(img => img.id === item.thumbnail);
                  return <ItemCard key={item.id} item={item} category={category} image={image} showTags={true} lang={lang} dict={dict} />;
                })
              ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg md:col-span-2">
                  <h3 className="text-xl font-semibold">{dict.category_page.no_results_title}</h3>
                  <p className="text-muted-foreground mt-2">
                    {dict.category_page.no_results_description}
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
