import { CategoryCard } from "./CategoryCard";

interface Category {
  label: string;
  count: number;
}

interface CategoryListProps {
  categories: Category[];
  onCategoryClick?: (category: string) => void;
}

function CategorieList({ categories, onCategoryClick }: CategoryListProps) {
  return (
    <div className="space-y-4 ">
      <div className="space-y-2">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.label}
            label={cat.label}
            count={cat.count}
            onClick={() => onCategoryClick?.(cat.label)}
          />
        ))}
      </div>
    </div>
  );
}

export default CategorieList;
