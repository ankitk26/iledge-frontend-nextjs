"use client";

import { queryClient } from "@/app/providers/query-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { loadTransactions } from "@/server-actions/load-transactions";
import { useTransactionStore } from "@/stores/transaction-store";
import { useMutation } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function LoadTransactionsButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: loadTransactions,
    onSuccess: () => {
      const year = useTransactionStore.getState().year;
      const month = useTransactionStore.getState().month;

      // Invalidate queries after successful load
      queryClient.invalidateQueries({
        queryKey: ["monthly_totals"],
      });
      queryClient.invalidateQueries({
        queryKey: ["monthly_transactions", year, month],
      });

      // Close dialog and show toast
      setTimeout(() => {
        setDialogOpen(false);
        toast({
          title: "New transactions loaded successfully",
          description: "Your transaction data has been updated.",
        });
      }, 500); // Small delay for better UX
    },
    onError: (error) => {
      setDialogOpen(false);
      toast({
        title: "Failed to load transactions",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const { toast } = useToast();

  const handleLoadTransactions = async () => {
    setDialogOpen(true);
    await mutateAsync();
  };

  return (
    <>
      <Button
        size="icon"
        disabled={isPending}
        onClick={handleLoadTransactions}
        aria-label="Load new transactions"
      >
        <RefreshCw className={isPending ? "animate-spin" : ""} />
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
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
    </>
  );
}
