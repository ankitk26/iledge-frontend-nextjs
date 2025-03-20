import CurrentMonthExpenses from "@/app/(home)/current-month-expenses";
import CurrentMonthWeeklyExpenses from "./current-month-weekly-expenses";

export default function HomePage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Current month stats</h1>
      <div className="my-8 grid flex-1 gap-8 md:gap-8 lg:grid-cols-3">
        <CurrentMonthExpenses />
        <CurrentMonthWeeklyExpenses />
      </div>
    </>
  );
}
