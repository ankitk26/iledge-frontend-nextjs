"use client";

import { queryClient } from "@/app/providers/query-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { loadTransactions } from "@/server-actions/load-transactions";
import { useMutation } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";

export default function LoadTransactionsButton() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: loadTransactions,
  });
  const { toast } = useToast();

  return (
    <Dialog open={isPending}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          disabled={isPending}
          onClick={async () => {
            await mutateAsync();
            queryClient.invalidateQueries({
              queryKey: ["monthly_totals"],
            });
            // queryClient.invalidateQueries({
            //   queryKey: ["monthly_transactions", year, month],
            // });
            toast({
              title: "New transactions are loaded ✅",
            });
          }}
        >
          <RefreshCw />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Load new transactions
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col items-center gap-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span className="text-xs">Load in progress...</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
