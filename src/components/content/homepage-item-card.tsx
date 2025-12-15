import type { PortfolioItem, Category } from '@/lib/types';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import ItemCard from './item-card';

interface HomepageItemCardProps {
  item: PortfolioItem;
  category: Category;
  image?: ImagePlaceholder;
}

export default function HomepageItemCard({ item, category, image }: HomepageItemCardProps) {
  return (
    <ItemCard 
      item={item} 
      category={category} 
      image={image} 
      showTags={false} 
    />
  );
}
