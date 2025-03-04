import { Skeleton } from "@/components/ui/skeleton";

export default async function AdminLoadingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Admin page</h1>
      <section className="flex flex-col mt-4 gap-8">
        <Skeleton className="w-full rounded-xl h-[80px]" />
        <Skeleton className="w-full rounded-xl h-[80px]" />
      </section>
    </div>
  );
}
