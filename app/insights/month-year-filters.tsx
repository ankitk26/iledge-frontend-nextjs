import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  updateInsightsFilter,
  useInsightsStore,
} from "@/stores/insights-store";

export default function MonthYearFilters() {
  const { month, year, tabState } = useInsightsStore();

  if (tabState === 0) {
    return null;
  }

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // get all years from 2023
  const years = Array.from({ length: currentYear - 2022 }, (_, i) => 2023 + i);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Limit months if the selected year is the current year
  const visibleMonths =
    year === currentYear ? months.slice(0, currentMonth) : months;

  // Handle invalid month when year changes
  const handleYearChange = (val: string) => {
    const newYear = parseInt(val);

    // Reset month to currentMonth if it doesn't exist in the selected year
    if (newYear === currentYear && month && month > currentMonth) {
      updateInsightsFilter({ year: newYear, month: currentMonth });
    } else {
      updateInsightsFilter({ year: newYear });
    }
  };

  return (
    <div className="flex items-center justify-end gap-4">
      <Select value={year?.toString()} onValueChange={handleYearChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Choose year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((yearItem) => (
            <SelectItem key={yearItem} value={yearItem.toString()}>
              {yearItem}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={month?.toString() || "1"}
        onValueChange={(val) => updateInsightsFilter({ month: parseInt(val) })}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Choose month" />
        </SelectTrigger>
        <SelectContent>
          {visibleMonths.map((monthItem, i) => (
            <SelectItem key={i + 1} value={(i + 1).toString()}>
              {monthItem}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
