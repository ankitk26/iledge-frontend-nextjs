import { getTransactions } from "@/queries/get-transactions";
import { getMonthlyTotals } from "@/queries/monthly-totals";
import MonthlyTotalChart from "./monthly-total-chart";
import MonthlyTransactions from "./monthly-transactions";
import TransactionProvider from "./transaction-provider";

export default async function TransactionsPage() {
  const monthlyTotals = await getMonthlyTotals();
  const allTransactions = await getTransactions();

  return (
    <div>
      <h1>Monthly transactions</h1>
      <TransactionProvider>
        <MonthlyTotalChart monthlyTotals={monthlyTotals} />
        <MonthlyTransactions allTransactions={allTransactions} />
      </TransactionProvider>
    </div>
  );
}
