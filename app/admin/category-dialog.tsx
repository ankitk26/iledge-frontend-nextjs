"use client";

import CategoryIcon from "@/components/category-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import getCategories from "@/queries/get-categories";
import { updateReceiverCategory } from "@/queries/update-receiver-category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { queryClient } from "../providers/query-provider";
import CategoryDialogContent from "./category-dialog-content";

interface Props {
  receiver: {
    receiver_id: number;
    receiver_upi_id: string;
    name: string;
    category_id: number;
    category_description: string;
    category_icon: string;
  };
}

export default function CategoryDialog({ receiver }: Props) {
  const {
    data: categories,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const [currentCategory, setCurrentCategory] = useState(receiver.category_id);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutateAsync, isPending: mutationPending } = useMutation({
    mutationFn: () =>
      updateReceiverCategory(receiver.receiver_id, currentCategory),
    onSuccess: () => {
      toast({
        title: "Category updated ✅",
      });
      queryClient.invalidateQueries({
        queryKey: ["receivers"],
      });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Something went wrong ⚠️",
        description: "Please try again later",
      });
    },
  });

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (open) {
          setCurrentCategory(receiver.category_id);
        }
        setIsDialogOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <CategoryIcon
            icon_name={receiver.category_icon}
            className="stroke-neutral-400"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>Update category</DialogTitle>
        </DialogHeader>

        <ScrollArea className="mt-6 max-h-[50vh]">
          <CategoryDialogContent
            categories={categories}
            currentCategory={currentCategory}
            isError={isError}
            isPending={isPending}
            setCurrentCategory={setCurrentCategory}
          />
        </ScrollArea>
        <DialogFooter className="mt-4 gap-3">
          <Button
            disabled={
              mutationPending || currentCategory === receiver.category_id
            }
            onClick={async () => {
              await mutateAsync();
            }}
          >
            {mutationPending ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
          <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
