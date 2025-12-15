import fs from 'fs/promises';
import path from 'path';
import type { PortfolioItem, Category } from './types';
import { CATEGORIES } from './types';

const contentDir = path.join(process.cwd(), 'content');

export async function getContent(category: Category): Promise<PortfolioItem[]> {
  try {
    const filePath = path.join(contentDir, `${category}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data: PortfolioItem[] = JSON.parse(fileContent);
    // Sort by date descending
    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error(`Error reading content for category "${category}":`, error);
    return [];
  }
}

export async function getContentBySlug(category: Category, slug: string): Promise<PortfolioItem | null> {
  const items = await getContent(category);
  return items.find(item => item.id === slug) || null;
}

export async function getLatestContent(): Promise<Partial<Record<Category, PortfolioItem>>> {
  const latestContent: Partial<Record<Category, PortfolioItem>> = {};

  for (const category of CATEGORIES) {
    const items = await getContent(category);
    if (items.length > 0) {
      latestContent[category] = items[0]; // Already sorted by date
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
