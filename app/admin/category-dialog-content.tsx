import CategoryIcon from "@/components/category-icon";
import ErrorMessage from "@/components/error-message";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { SelectCategory } from "@/db/schema";

interface Props {
  categories: SelectCategory[] | undefined;
  isPending: boolean;
  isError: boolean;
  currentCategory: number;
  setCurrentCategory: (id: number) => void;
}

export default function CategoryDialogContent({
  categories,
  isPending,
  isError,
  currentCategory,
  setCurrentCategory,
}: Props) {
  const groupCategoriesByParent = (
    categories: SelectCategory[] | undefined,
  ) => {
    const grouped: Record<string, SelectCategory[]> = {};

    if (!categories) return {};

    categories.forEach((category) => {
      const parentCategory = category?.parent_category || "Other";
      if (!grouped[parentCategory]) {
        grouped[parentCategory] = [];
      }
      grouped[parentCategory].push(category);
    });

    return grouped;
  };

  const groupedCategories = groupCategoriesByParent(categories);

  if (isPending)
    return (
      <div className="flex flex-wrap gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-16 w-16" />
        ))}
      </div>
    );

  if (isError) return <ErrorMessage />;

  return (
    <div className="pr-4">
      {Object.keys(groupedCategories).map((parentCategory) => (
        <div className="mb-6" key={parentCategory}>
          <h3 className="mb-3 text-sm font-medium text-neutral-300">
            {parentCategory}
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {groupedCategories[parentCategory].map((category) => (
              <div
                key={category.id}
                className="flex h-full flex-col items-center justify-between rounded-lg border border-transparent p-2 transition-all hover:border-neutral-800 hover:bg-neutral-900/20"
              >
                <Button
                  size="icon"
                  variant={
                    currentCategory === category.id ? "default" : "outline"
                  }
                  className="mb-2"
                  onClick={() => setCurrentCategory(category.id)}
                >
                  <CategoryIcon
                    icon_name={category.icon_name}
                    className="h-4 w-4"
                  />
                </Button>
                <span
                  className="w-full truncate text-center text-sm"
                  title={category.description}
                >
                  {category.description}
                </span>
              </div>
            ))}
          </div>
          <Separator className="mt-6 bg-neutral-800" />
        </div>
      ))}
    </div>
  );
}
