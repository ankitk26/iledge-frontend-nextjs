import CurrentMonthExpenses from "@/components/current-month-expenses";
import { CurrentMonthWeeklyExpenses } from "@/components/current-month-weekly-expenses";

export default function HomePage() {
  return (
    <div className="grid grid-cols-3 flex-1 gap-4">
      <CurrentMonthExpenses />
      <CurrentMonthWeeklyExpenses />
    </div>
  );
}
