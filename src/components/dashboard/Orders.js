import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getOrders, getOrderSummary } from "@/api/orders";
import {
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_SHIPPED,
} from "@/constants/orderStatus";

import DashboardCard from "./Card";
import Spinner from "../Spinner";
import { LuClockAlert } from "react-icons/lu";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaCheckCircle, FaShippingFast } from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#EF4444", "#3B82F6", "#F59E0B", "#10B981"];

function DashboardOrders() {
  const [loading, setLoading] = useState(true);
  const [orderCount, setOrderCount] = useState({
    pending: 0,
    confirmed: 0,
    shipped: 0,
    delivered: 0,
  });

  useEffect(() => {
    setLoading(true);

    getOrderSummary()
      .then((res) => {
        setOrderCount(res.data); // { pending, confirmed, shipped, delivered }
      })
      .catch((error) => {
        toast.error(error.response?.data || "Error loading order summary", {
          autoClose: 750,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);

    getOrders()
      .then((response) => {
        const orders = response.data;

        let pending = 0;
        let confirmed = 0;
        let shipped = 0;
        let delivered = 0;

        orders.forEach((order) => {
          switch (order.status) {
            case ORDER_STATUS_PENDING:
              return pending++;
            case ORDER_STATUS_CONFIRMED:
              return confirmed++;
            case ORDER_STATUS_SHIPPED:
              return shipped++;
            case ORDER_STATUS_DELIVERED:
              return delivered++;
            default:
              return;
          }
        });

        setOrderCount({ pending, confirmed, shipped, delivered });
      })
      .catch((error) =>
        toast.error(error.response?.data || "Error loading orders", {
          autoClose: 750,
        })
      )
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const chartData = [
    { name: "Pending", value: orderCount.pending },
    { name: "Confirmed", value: orderCount.confirmed },
    { name: "Shipped", value: orderCount.shipped },
    { name: "Delivered", value: orderCount.delivered },
  ];

  const lineChartData = [
    { day: "Mon", value: 12 },
    { day: "Tue", value: 15 },
    { day: "Wed", value: 14 },
    { day: "Thu", value: 18 },
    { day: "Fri", value: 16 },
    { day: "Sat", value: 20 },
    { day: "Sun", value: 17 },
  ];

  return (
    <section className="px-4">
      <h2 className="font-semibold text-xl dark:text-white mb-4">
        Order Dashboard
      </h2>

      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <>
          {/* Top Stat Cards */}
          <div className="py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <DashboardCard
              label="Pending Order"
              value={orderCount.pending}
              className="bg-red-200 dark:bg-red-600"
              icon={
                <LuClockAlert className="w-7 h-7 text-red-500 dark:text-red-200 mb-3" />
              }
            />
            <DashboardCard
              label="Confirmed Order"
              value={orderCount.confirmed}
              className="bg-blue-200 dark:bg-blue-600"
              icon={
                <IoShieldCheckmark className="w-7 h-7 text-blue-500 dark:text-blue-200 mb-3" />
              }
            />
            <DashboardCard
              label="Shipped Order"
              value={orderCount.shipped}
              className="bg-yellow-200 dark:bg-yellow-600"
              icon={
                <FaShippingFast className="w-7 h-7 text-yellow-500 dark:text-yellow-200 mb-3" />
              }
            />
            <DashboardCard
              label="Delivered Order"
              value={orderCount.delivered}
              className="bg-green-200 dark:bg-green-600"
              icon={
                <FaCheckCircle className="w-7 h-7 text-green-500 dark:text-green-200 mb-3" />
              }
            />
          </div>

          {/* Graphs Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Bar Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
              <h3 className="text-lg font-semibold mb-2 text-center text-white">
                Bar Chart
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value">
                    {chartData.map((_, index) => (
                      <Cell key={`cell-bar-${index}`} fill={COLORS[index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart (Vertical-style trend) */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
              <h3 className="text-lg font-semibold mb-2 text-center text-white">
                Line Chart
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10B981"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mt-6">
            <h3 className="text-lg font-semibold mb-2 text-center text-white">
              Pie Chart
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={140} // larger pie
                  label>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-pie-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div> */}
        </>
      )}
    </section>
  );
}

export default DashboardOrders;
