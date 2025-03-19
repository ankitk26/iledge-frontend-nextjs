import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TopSpendersSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
      {[...Array(5)].map((_, index) => (
        <Card key={index} className="border-neutral-700 bg-neutral-800">
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-3/4 bg-neutral-700" />
          </CardHeader>
          <CardContent>
            <Skeleton className="mb-2 h-8 w-full bg-neutral-700" />
            <Skeleton className="h-3 w-1/2 bg-neutral-700" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
