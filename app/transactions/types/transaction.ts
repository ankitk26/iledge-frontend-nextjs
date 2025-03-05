export type Transaction = {
  id: number;
  receiver_id: number;
  receiver_name: string;
  receiver_upi: string;
  transaction_date: Date | null;
  amount: number;
  category_id: number;
  category_description: string;
  category_icon: string;
};
