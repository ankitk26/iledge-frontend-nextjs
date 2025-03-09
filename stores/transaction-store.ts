import { create } from "zustand";

interface TransactionState {
  month: number;
  year: number;
}

export const useTransactionStore = create<TransactionState>()(() => ({
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
}));

export const updateMonth = (newMonth: number) =>
  useTransactionStore.setState({ month: newMonth });

export const updateYear = (newYear: number) =>
  useTransactionStore.setState({ year: newYear });
