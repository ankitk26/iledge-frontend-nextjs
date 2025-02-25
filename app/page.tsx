import CurrentMonthExpenses from "@/components/current-month-expenses";
import { CurrentMonthWeeklyExpenses } from "@/components/current-month-weekly-expenses";

export default function HomePage() {
  return (
    <div className="grid md:grid-cols-3 flex-1 md:gap-4 gap-8">
      <CurrentMonthExpenses />
      <CurrentMonthWeeklyExpenses />
    </div>
  );
}
