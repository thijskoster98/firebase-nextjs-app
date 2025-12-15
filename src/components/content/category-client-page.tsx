'use client';

import { useState, useMemo, useEffect } from 'react';
import type { PortfolioItem, Category } from '@/lib/types';
import { CATEGORY_DISPLAY_NAMES } from '@/lib/types';
import ItemCard from '@/components/content/item-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Search, X } from 'lucide-react';
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{CATEGORY_DISPLAY_NAMES[category]}</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Browse all {category}, search by keyword, or filter by tag.
      </p>

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
  );
}
