import LoadTransactionsButton from "@/components/load-transactions-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="lg:px-24 px-8">
      <div className="flex items-center py-4 justify-between border-b border-b-neutral-800">
        <Link href="/">
          <h1 className="text-2xl font-bold">iLedge</h1>
        </Link>
        <div className="flex lg:hidden text-sm gap-8">
          <Button size="icon">
            <MenuIcon />
          </Button>
        </div>
        <div className="lg:flex text-sm items-center hidden gap-8">
          <Link
            href="/transactions"
            className="hover:underline hover:text-gray-100"
          >
            Transactions
          </Link>
          <Link
            href="/insights"
            className="hover:underline hover:text-gray-100"
          >
            Insights
          </Link>
          <Link href="/admin" className="hover:underline hover:text-gray-100">
            Admin
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <LoadTransactionsButton />
              </TooltipTrigger>
              <TooltipContent>
                <p>Load new transactions</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}
