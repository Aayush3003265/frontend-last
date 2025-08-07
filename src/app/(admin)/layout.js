"use client";

import AdminSidebar from "@/components/admin/Sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { allowedAdminRoles } from "@/helpers/auth";
import { LOGIN_ROUTE } from "@/constants/routes";

function AdminLayout({ children }) {
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (!user) router.push(LOGIN_ROUTE);

    //allow only MERCHANT and ADMIN roles
    const isAllowed = allowedAdminRoles(user?.roles);

    if (!isAllowed) router.push(LOGIN_ROUTE);
  }, [router, user]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] dark:bg-slate-800">
      <AdminSidebar />
      <div>{children}</div>
    </div>
  );
}

export default AdminLayout;
