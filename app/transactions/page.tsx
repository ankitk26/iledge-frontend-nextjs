import MonthlyTotalChart from "./monthly-total-chart";
import MonthlyTransactions from "./monthly-transactions";

export default function TransactionsPage() {
  return (
    <div>
      <h1 className="text-lg font-bold lg:text-2xl">Monthly transactions</h1>
      <MonthlyTotalChart />
      <MonthlyTransactions />
    </div>
  );
}
