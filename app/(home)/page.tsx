import CurrentMonthExpenses from "@/app/(home)/current-month-expenses";
import CurrentMonthWeeklyExpenses from "./current-month-weekly-expenses";

export default function HomePage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Current month stats</h1>
      <div className="mt-8 grid flex-1 gap-8 md:grid-cols-3 md:gap-8">
        <CurrentMonthExpenses />
        <CurrentMonthWeeklyExpenses />
      </div>
    </>
  );
}
