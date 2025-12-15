import { getContent, getAllTags } from '@/lib/content';
import { notFound } from 'next/navigation';
import type { Category } from '@/lib/types';
import { CATEGORIES } from '@/lib/types';
import CategoryClientPage from '@/components/content/category-client-page';
import { getDictionary } from '@/lib/dictionaries';

export async function generateStaticParams() {
  const params: { lang: string; category: Category }[] = [];
  const locales = ['en', 'nl'];
  for (const lang of locales) {
      for (const category of CATEGORIES) {
        params.push({ lang, category });
      }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { lang: string, category: Category } }) {
    if (!CATEGORIES.includes(params.category)) {
      return { title: 'Not Found' }
    }
    const dict = await getDictionary(params.lang);
    const categoryNames: Record<Category, string> = {
        projects: dict.header.projects,
        essays: dict.header.essays,
        reviews: dict.header.reviews,
        memos: dict.header.memos,
    };
    return {
      title: `${categoryNames[params.category]} | JSON Portfolio`,
      description: `Browse all ${params.category}.`,
    }
}

export default async function CategoryPage({ params }: { params: { lang: string, category: Category } }) {
  if (!CATEGORIES.includes(params.category)) {
    notFound();
  }

  const items = await getContent(params.category, params.lang);
  const allCategoryTags = (await getAllTags())[params.category];
  const dict = await getDictionary(params.lang);

  const categoryNames: Record<Category, string> = {
    projects: dict.header.projects,
    essays: dict.header.essays,
    reviews: dict.header.reviews,
    memos: dict.header.memos,
  };

  return (
    <CategoryClientPage
      items={items}
      category={params.category}
      allTags={allCategoryTags}
      lang={params.lang}
      dict={dict}
      categoryName={categoryNames[params.category]}
    />
  );
}
