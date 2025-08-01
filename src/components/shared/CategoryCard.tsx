import { ChevronRight, GripVertical } from "lucide-react";

interface CategoryCardProps {
  label: string;
  count: number;
  onClick?: () => void;
}

export function CategoryCard({ label, count, onClick }: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between px-4 py-3 rounded-md bg-white dark:bg-muted hover:bg-muted/80 cursor-pointer shadow-sm"
    >
      <div className="flex items-center gap-3 py-2">
        <GripVertical className="text-muted-foreground h-4 w-4" />
        <p className="font-medium text-md">{label}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-400">{count}</span>
        <ChevronRight className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
}
