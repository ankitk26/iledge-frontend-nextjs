"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth-client";
import { Menu } from "lucide-react";
import Link from "next/link";
import LoadTransactionsButton from "./load-transactions-button";
import { Button } from "./ui/button";
import UserProfile from "./user-profile";

export default function Header() {
  const { data: session } = authClient.useSession();
  const isLoggedIn = !!session;

  const navLinks = [
    { href: "/transactions", label: "Transactions" },
    { href: "/insights", label: "Insights" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <header className="px-8 lg:px-24">
      <div className="flex items-center justify-between border-b border-b-neutral-800 py-4">
        <Link href="/">
          <h1 className="text-2xl font-bold">iLedge</h1>
        </Link>

        {/* Mobile Menu Button - Only show if logged in */}
        {isLoggedIn && (
          <div className="flex items-center gap-4 lg:hidden">
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

            <Button size="icon" aria-label="Menu">
              <Menu />
            </Button>
          </div>
        )}

        {/* Desktop Navigation - Only show if logged in */}
        {isLoggedIn && (
          <nav className="hidden items-center gap-8 text-sm lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-gray-100 hover:underline"
              >
                {link.label}
              </Link>
            ))}
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
            <UserProfile />
          </nav>
        )}
      </div>
    </header>
  );
}
