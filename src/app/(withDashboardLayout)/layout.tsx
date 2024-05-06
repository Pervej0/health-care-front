import DashboardDrawer from "@/components/dashboard/DashboardDrawer";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <DashboardDrawer>{children}</DashboardDrawer>;
};

export default layout;
