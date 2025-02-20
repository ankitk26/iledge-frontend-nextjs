import { formatCurrency } from "@/lib/format-currency";
import { Label, Pie, PieChart } from "recharts";
import { CardContent } from "./ui/card";
import { ChartConfig, ChartContainer } from "./ui/chart";

interface Props {
  budget: number;
  currentMonthExpenses: number;
}

export default function SummaryCompareCardContent({
  budget,
  currentMonthExpenses,
}: Props) {
  const chartConfig = {
    amount: {
      label: "Amount",
    },
    expense: {
      label: "Expense",
    },
    budget: {
      label: "Budget",
    },
  } satisfies ChartConfig;

  const chartData = [
    {
      type: "expense",
      amount: currentMonthExpenses,
      fill: "var(--color-blue-800)",
    },
    {
      type: "savings",
      amount: Math.max(budget - currentMonthExpenses, 0),
      fill: "var(--color-blue-200)",
    },
  ];

  return (
    <CardContent className="p-0 flex-1">
      <ChartContainer config={chartConfig} className="mx-auto aspect-square">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="amount"
            nameKey="type"
            innerRadius={80}
            outerRadius={120}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-white text-lg font-bold"
                      >
                        {formatCurrency(currentMonthExpenses)}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-blue-100 text-sm"
                      >
                        spent
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </CardContent>
  );
}
