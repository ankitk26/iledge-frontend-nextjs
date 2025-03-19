"use client";

import DashboardHeader from "./dashboard-header";
import OtherPayeesTable from "./other-payees-table";
import TopFivePayees from "./top-five-payees";

const SpendingDashboard = () => {
  return (
    <div className="flex min-h-screen flex-col gap-6 bg-neutral-950 text-neutral-50">
      <DashboardHeader />
      <TopFivePayees />
      <OtherPayeesTable />
    </div>
  );
};

export default SpendingDashboard;
