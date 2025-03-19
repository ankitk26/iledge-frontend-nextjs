import { getTopSpends } from "@/queries/get-top-spends";
import { useQuery } from "@tanstack/react-query";

type Props = {
  month?: number | null;
  year?: number | null;
  searchTerm?: string;
};

export const usePayee = ({
  month = null,
  year = null,
  searchTerm = "",
}: Props) => {
  return useQuery({
    queryKey: ["top_payees_all"],
    queryFn: () =>
      getTopSpends({
        month,
        year,
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
