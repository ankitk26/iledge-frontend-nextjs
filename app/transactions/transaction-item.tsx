"use client";

import Link from "next/link";
import TransactionItemContent from "./transaction-item-content";
import { Transaction } from "./types/transaction";

interface Props {
  transaction: Transaction;
  linkEnabled?: boolean;
}

export default function TransactionItem({
  transaction,
  linkEnabled = true,
}: Props) {
  if (linkEnabled) {
    return (
      <Link href={`/payees/${transaction.receiver_id}`} className="block">
        <TransactionItemContent transaction={transaction} />
      </Link>
    );
  }

  return <TransactionItemContent transaction={transaction} />;
}
