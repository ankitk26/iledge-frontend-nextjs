import { getTopSpends } from "@/queries/get-top-spends";
import { useInsightsStore } from "@/stores/insights-store";
import { useQuery } from "@tanstack/react-query";

type Props = {
  month?: number | null;
  year?: number | null;
  searchTerm?: string;
};

export const usePayee = ({ searchTerm = "" }: Props) => {
  const { month, year, tabState } = useInsightsStore();

  const dependentMonth = tabState === 0 ? null : month;
  const dependentYear = tabState === 0 ? null : year;

  return useQuery({
    queryKey: ["top_payees_all", dependentMonth, dependentYear],
    queryFn: () =>
      getTopSpends({
        month: dependentMonth,
        year: dependentYear,
      }),
    select: (data) => {
      const totalSpent = data
        ? data.reduce((acc, cur) => acc + cur.amount_spent, 0)
        : 0;
      const topFivePayees = data ? data.slice(0, 5) : [];
      const filteredSpenders = data?.filter((spender) =>
        spender.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      const filteredTotalSpent =
        filteredSpenders?.reduce(
          (total: number, item) => total + item.amount_spent,
          0,
        ) || 0;
      return {
        payeesCount: data.length,
        totalSpent,
        topFivePayees,
        filteredSpenders,
        filteredTotalSpent,
      };
    },
  });
};

export const calculatePercentage = (
  amount: number,
  totalSpent: number,
): string => {
  return ((amount / (totalSpent || 1)) * 100).toFixed(1);
};
