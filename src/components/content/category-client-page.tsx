'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PortfolioItem, Category } from '@/lib/types';
import { CATEGORY_DISPLAY_NAMES } from '@/lib/types';
import ItemCard from '@/components/content/item-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Search, X, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface CategoryClientPageProps {
  items: PortfolioItem[];
  category: Category;
  allTags: string[];
}

export default function CategoryClientPage({ items, category, allTags }: CategoryClientPageProps) {
  const searchParams = useSearchParams();
  const initialTags = searchParams.get('tags');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags ? initialTags.split(',') : []);

  const bannerImage = PlaceHolderImages.find((img) => img.id === 'category-banner');
  const authorImage = PlaceHolderImages.find((img) => img.id === 'author-portrait');


  useEffect(() => {
    const newTags = searchParams.get('tags');
    setSelectedTags(newTags ? newTags.split(',') : []);
  }, [searchParams]);

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Tag filtering
        if (selectedTags.length > 0) {
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
          item.tags.join(' '),
          item.date,
          item.content,
          item.intro,
          item.subtitle,
        ]
          .join(' ')
          .toLowerCase();
        return contentToSearch.includes(query);
      });
  }, [items, searchQuery, selectedTags]);

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
    
    // Using window.history.pushState to avoid a full page reload, for a smoother UX
    window.history.pushState({}, '', `${window.location.pathname}?${newParams.toString()}`);
    setSelectedTags(newTags);
  };

  const clearFilters = () => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.delete('tags');
    window.history.pushState({}, '', `${window.location.pathname}?${newParams.toString()}`);
    setSelectedTags([]);
  }

  return (
    <>
      {bannerImage && (
        <section className="relative w-full h-48 md:h-56 shadow-inner">
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
              {CATEGORY_DISPLAY_NAMES[category]}
            </h1>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Welcome to the {category} section. Here you can browse all entries, search by keyword, or filter by specific tags to find exactly what you're looking for. This collection is part of a larger personal project exploring different technologies and sharing thoughts on design, development, and everything in between.
              </p>
            </div>
             <p className="font-headline text-2xl mt-6 text-right mr-4">- John Doe</p>
          </div>
          <div className="md:col-span-1 flex flex-col items-center -mt-48">
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
                    <Link href="/about">
                        More About Me
                        <ArrowRight className="ml-2" />
                    </Link>
                </Button>
                <Button asChild variant="secondary">
                    <Link href="/cv-contact">
                        CV & Contact
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
              placeholder={`Search in ${category}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>

        <div className="mb-8">
            <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Filter by tag:</h3>
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
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear filters
                  </Button>
              )}
            </div>
          </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const image = PlaceHolderImages.find(img => img.id === item.thumbnail);
              return <ItemCard key={item.id} item={item} category={category} image={image} showTags={true} />;
            })
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg md:col-span-2">
              <h3 className="text-xl font-semibold">No results found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
