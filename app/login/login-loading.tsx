import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LoginLoading() {
  return (
    <div className="flex flex-col items-center rounded-xl border border-neutral-800 py-12">
      <h2 className="text-2xl font-bold">Welcome back</h2>
      <h4 className="mt-2 text-sm text-neutral-500">Please log in</h4>
      <Button className="mt-8" disabled>
        <Loader2 className="h-5 w-5 animate-spin" />
      </Button>
    </div>
  );
}
