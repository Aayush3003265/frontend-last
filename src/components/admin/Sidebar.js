"use client";
import Link from "next/link";
import { GiPieChart } from "react-icons/gi";
import { FaUsersCog } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import {
  DASHBOARD_ROUTE,
  ORDER_MANAGEMENT_ROUTE,
  PRODUCT_MANAGEMENT_ROUTE,
  USER_MANAGEMENT_ROUTE,
} from "@/constants/routes";
import { LuPackageOpen } from "react-icons/lu";
import { ROLE_ADMIN, ROLE_MERCHANT } from "@/constants/roles";
import { useSelector } from "react-redux";

const sidebarMenu = [
  {
    label: "Dashboard",
    route: DASHBOARD_ROUTE,
    icon: <GiPieChart className="w-5 h-5 text-gray-500 dark:text-white" />,
    authRole: ROLE_ADMIN,
  },
  {
    label: "Product Management",
    route: PRODUCT_MANAGEMENT_ROUTE,
    icon: (
      <MdOutlineLocalGroceryStore className="w-5 h-5 text-gray-500 dark:text-white" />
    ),
    authRole: ROLE_ADMIN,
  },
  {
    label: "Order Management",
    route: ORDER_MANAGEMENT_ROUTE,
    icon: <LuPackageOpen className="w-5 h-5 text-gray-500 dark:text-white" />,
    authRole: ROLE_ADMIN,
  },
  {
    label: "User Management",
    route: USER_MANAGEMENT_ROUTE,
    icon: <FaUsersCog className="w-5 h-5 text-gray-500 dark:text-white" />,
    authRole: ROLE_ADMIN,
  },
];

function AdminSidebar() {
  const pathname = usePathname();

  const { user } = useSelector((state) => state.auth);

  return (
    <aside className="sticky top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 hidden sm:block">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <ul className="space-y-2 font-medium">
          {sidebarMenu.map((menu, index) => {
            const isActive =
              pathname == menu.route || pathname.startsWith(menu.route);

            if (!user?.roles.includes(menu.authRole)) return null;

            return (
              <li key={index}>
                <Link
                  href={menu.route}
                  className={`${
                    isActive ? "bg-gray-200 dark:bg-gray-700" : ""
                  } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 group`}>
                  {menu.icon}
                  <span className="ms-3">{menu.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default AdminSidebar;
