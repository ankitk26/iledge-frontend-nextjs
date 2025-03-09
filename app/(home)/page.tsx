import CurrentMonthExpenses from "@/app/(home)/current-month-expenses";
import CurrentMonthWeeklyExpenses from "./current-month-weekly-expenses";

export default function HomePage() {
  return (
    <div className="grid flex-1 gap-8 md:grid-cols-3 md:gap-4">
      <CurrentMonthExpenses />
      <CurrentMonthWeeklyExpenses />
    </div>
  );
}
