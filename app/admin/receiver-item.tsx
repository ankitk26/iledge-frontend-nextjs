"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectCategory, SelectReceiver } from "@/db/schema";
import { Edit2Icon, XIcon } from "lucide-react";
import { useState } from "react";

interface Props {
  receiver: SelectReceiver;
  categories: SelectCategory[];
}

export default function ReceiverItem({ receiver, categories }: Props) {
  const [defaultCategory, setDefaultCategory] = useState(
    receiver.category_id.toString()
  );

  return (
    <div
      key={receiver.id}
      className="border rounded-xl p-4 border-neutral-700 flex items-center justify-between"
    >
      <div className="flex flex-col items-start gap-1">
        <h2 className="text-sm">{receiver.name}</h2>
        <h3 className="text-neutral-500 text-sm">{receiver.receiver_upi_id}</h3>
      </div>

      <div className="flex items-center gap-4">
        <Select
          value={defaultCategory}
          onValueChange={(val) => {
            console.log(val);
            setDefaultCategory(val);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Update category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem
                key={`${receiver.id}-${category.id}`}
                value={category.id.toString()}
              >
                {category.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {receiver.category_id.toString() !== defaultCategory && (
          <>
            <Button size="sm">
              <Edit2Icon />
            </Button>
            <Button
              size="sm"
              onClick={() =>
                setDefaultCategory(receiver.category_id.toString())
              }
            >
              <XIcon />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
