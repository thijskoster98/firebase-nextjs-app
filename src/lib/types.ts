export interface PortfolioItemTranslation {
  title: string;
  subtitle: string | null;
  intro: string;
  content: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string | null;
  intro: string;
  content: string;
  date: string; // "YYYY-MM-DD"
  tags: string[];
  thumbnail: string;
  rating?: number; // 0-5, optional
  translations?: {
    [locale: string]: PortfolioItemTranslation;
  };
}

export type Category = 'projects' | 'essays' | 'reviews' | 'memos';

export const CATEGORIES: Category[] = ['projects', 'essays', 'reviews', 'memos'];

export const CATEGORY_DISPLAY_NAMES: Record<Category, string> = {
  projects: 'Projects',
  essays: 'Essays',
  reviews: 'Reviews',
  memos: 'Memos',
};
