import { categoryIcons } from "@/lib/category-icon";

interface CategoryIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  icon_name: string;
}

export default function CategoryIcon({
  icon_name,
  ...props
}: CategoryIconProps) {
  const Icon =
    categoryIcons[icon_name as keyof typeof categoryIcons] ||
    categoryIcons.default;

  return <Icon {...props} />;
}
