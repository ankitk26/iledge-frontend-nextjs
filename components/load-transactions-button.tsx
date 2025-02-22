"use client";

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
import { RefreshCw } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

export default function LoadTransactionsButton() {
  const { executeAsync, isPending } = useAction(loadTransactions);
  const { toast } = useToast();

  return (
    <Dialog open={isPending}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          disabled={isPending}
          onClick={async () => {
            await executeAsync();
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
        <div className="flex flex-col gap-2 items-center mt-4">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span className="text-xs">Load in progress...</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
