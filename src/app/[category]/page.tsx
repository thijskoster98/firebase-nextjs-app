import { getContent, getAllTags } from '@/lib/content';
import { notFound } from 'next/navigation';
import type { Category } from '@/lib/types';
import { CATEGORIES, CATEGORY_DISPLAY_NAMES } from '@/lib/types';
import CategoryClientPage from '@/components/content/category-client-page';

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: { params: { category: Category } }) {
    if (!CATEGORIES.includes(params.category)) {
      return { title: 'Not Found' }
    }
    return {
      title: `${CATEGORY_DISPLAY_NAMES[params.category]} | JSON Portfolio`,
      description: `Browse all ${params.category}.`,
    }
}

export default async function CategoryPage({ params }: { params: { category: Category } }) {
  if (!CATEGORIES.includes(params.category)) {
    notFound();
  }

  const items = await getContent(params.category);
  const allCategoryTags = (await getAllTags())[params.category];

  return (
    <CategoryClientPage
      items={items}
      category={params.category}
      allTags={allCategoryTags}
    />
  );
}
