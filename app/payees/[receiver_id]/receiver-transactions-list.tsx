import TransactionItem from "@/app/transactions/transaction-item";
import ErrorMessage from "@/components/error-message";
import { Skeleton } from "@/components/ui/skeleton";
import { getTransactions } from "@/queries/get-transactions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function ReceiverTransactionsList() {
  const { receiver_id } = useParams() as {
    receiver_id: string;
  };

  const {
    data: transactions,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["transactions_by_receiver", receiver_id],
    queryFn: () => getTransactions({ receiver_id: parseInt(receiver_id) }),
  });

  if (isPending) {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">All transactions</h2>
        <Skeleton className="mt-4 h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </section>
    );
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold">All transactions</h2>
      <div className="my-4 flex flex-col items-stretch gap-4">
        {transactions &&
          transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              linkEnabled={false}
            />
          ))}
      </div>
    </section>
  );
}
