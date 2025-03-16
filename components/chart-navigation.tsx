"use client";

import { Button } from "@/components/ui/button";
import {
  PaginationState,
  usePaginationControls,
} from "@/stores/pagination-store";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function ChartPagination({
  paginationInstanceId,
  config,
}: {
  paginationInstanceId: string;
  config?: Partial<PaginationState>;
}) {
  const {
    navigateMostOld,
    navigatePrevious,
    navigateNext,
    navigateMostRecent,
    isAtMostOld,
    isAtMostRecent,
    canGoToOlder,
    canGoToNewer,
    startItem,
    endItem,
    totalItems,
  } = usePaginationControls(paginationInstanceId, config);

  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <div className="text-xs text-gray-500">
        Showing {startItem} to {endItem} of {totalItems} entries
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={navigateMostOld}
          disabled={isAtMostOld}
          title="Go to oldest data"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={navigatePrevious}
          disabled={!canGoToNewer}
          title="Previous (older data)"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={navigateNext}
          disabled={!canGoToOlder}
          title="Next (newer data)"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={navigateMostRecent}
          disabled={isAtMostRecent}
          title="Go to newest data"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
