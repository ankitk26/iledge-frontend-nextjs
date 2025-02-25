"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const TransactionContext = createContext(
  {} as {
    month: number;
    setMonth: Dispatch<SetStateAction<number>>;
    year: number;
    setYear: Dispatch<SetStateAction<number>>;
  }
);

export default function TransactionProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <TransactionContext.Provider
      value={{
        month,
        setMonth,
        year,
        setYear,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
export const useTransactions = () => useContext(TransactionContext);
