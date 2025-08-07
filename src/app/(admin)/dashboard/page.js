"use client";
import DashboardCard from "@/components/dashboard/Card";
import DashboardOrders from "@/components/dashboard/Orders";

function DashboardPage() {
  return (
    <section className="p-5">
      <div className="grid grid-cols-[1fr_auto_auto] gap-3 items-center justify-between pb-5 px-1">
        <h1 className="font-semibold text-2xl dark:text-white">Dashboard</h1>
      </div>
      <DashboardOrders />
    </section>
  );
}

export default DashboardPage;
