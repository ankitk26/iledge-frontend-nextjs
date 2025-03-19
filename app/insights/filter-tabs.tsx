import { cn } from "@/lib/utils";
import {
  updateInsightsFilter,
  useInsightsStore,
} from "@/stores/insights-store";

export default function FilterTabs() {
  const { tabState } = useInsightsStore();

  return (
    <div className="flex items-center rounded-md bg-neutral-800 px-1 text-xs">
      <button
        className={cn(
          "rounded px-4 py-1",
          tabState === 0 ? "bg-neutral-900" : "bg-neutral-800",
        )}
        onClick={() => {
          updateInsightsFilter({ tabState: 0 });
        }}
      >
        All
      </button>
      <button
        className={cn(
          "rounded px-4 py-1",
          tabState === 1 ? "bg-neutral-900" : "bg-neutral-800",
        )}
        onClick={() => {
          updateInsightsFilter({ tabState: 1 });
        }}
      >
        Monthly
      </button>
    </div>
  );
}
