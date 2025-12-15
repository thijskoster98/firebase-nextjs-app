import fs from 'fs/promises';
import path from 'path';
import type { PortfolioItem, Category } from './types';
import { CATEGORIES } from './types';

const contentDir = path.join(process.cwd(), 'content');

export async function getContent(category: Category, locale: string = 'en'): Promise<PortfolioItem[]> {
  try {
    const filePath = path.join(contentDir, `${category}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    let data: PortfolioItem[] = JSON.parse(fileContent);

    // Apply translations if locale is not the default
    if (locale !== 'en') {
      data = data.map(item => {
        if (item.translations && item.translations[locale]) {
          return {
            ...item,
            ...item.translations[locale],
          };
        }
        return item;
      });
    }

    // Sort by date descending
    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error(`Error reading content for category "${category}":`, error);
    return [];
  }
}

export async function getContentBySlug(category: Category, slug: string, locale: string = 'en'): Promise<PortfolioItem | null> {
  const items = await getContent(category, 'en'); // get all items with original content to find by slug
  let item = items.find(item => item.id === slug) || null;

  if (item && locale !== 'en' && item.translations && item.translations[locale]) {
    item = {
      ...item,
      ...item.translations[locale],
    }
  }

  return item;
}

export async function getLatestContent(locale: string = 'en'): Promise<Partial<Record<Category, PortfolioItem[]>>> {
  const latestContent: Partial<Record<Category, PortfolioItem[]>> = {};

  for (const category of CATEGORIES) {
    const items = await getContent(category, locale);
    if (items.length > 0) {
      latestContent[category] = items.slice(0, 2); // Get the latest two items
    }
  }

  return latestContent;
}

export async function getAllTags(): Promise<Record<Category, string[]>> {
  const allTags: Record<Category, string[]> = {
    projects: [],
    essays: [],
    reviews: [],
    memos: [],
  };

  for (const category of CATEGORIES) {
    const items = await getContent(category);
    const categoryTags = new Set<string>();
    items.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => categoryTags.add(tag));
      }
    });
    allTags[category] = Array.from(categoryTags).sort();
  }

  return allTags;
}
