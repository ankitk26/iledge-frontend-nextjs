import MonthlyTotalChart from "./monthly-total-chart";
import MonthlyTransactions from "./monthly-transactions";

export default function TransactionsPage() {
  return (
    <div>
      <h1>Monthly transactions</h1>
      <MonthlyTotalChart />
      <MonthlyTransactions />
    </div>
  );
}
