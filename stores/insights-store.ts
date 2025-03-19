import { create } from "zustand";

interface InsightsState {
  tabState: number;
  month: number;
  year: number;
}

export const useInsightsStore = create<InsightsState>()(() => ({
  tabState: 0,
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
}));

export const updateInsightsFilter = (updates: Partial<InsightsState>) =>
  useInsightsStore.setState(updates);
