"use client";

import DashboardDrawer from "@/components/dashboard/DashboardDrawer";
import { getUserInfo } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const userInfo = getUserInfo();
  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }
  }, [userInfo, router]);

  return <DashboardDrawer>{children}</DashboardDrawer>;
};

export default Layout;
