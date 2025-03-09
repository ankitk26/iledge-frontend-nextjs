import MonthlyTotalChart from "./monthly-total-chart";
import MonthlyTransactions from "./monthly-transactions";
import TransactionProvider from "./transaction-provider";

export default function TransactionsPage() {
  return (
    <div>
      <h1>Monthly transactions</h1>
      <TransactionProvider>
        <MonthlyTotalChart />
        <MonthlyTransactions />
      </TransactionProvider>
    </div>
  );
}
