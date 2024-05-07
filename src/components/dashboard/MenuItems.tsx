import { getUserInfo } from "@/services/auth.services";
import { ISidebarItems, TUserRole } from "@/types";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import React from "react";

const MenuItems = ({ sidebarItem }: { sidebarItem: ISidebarItems }) => {
  return (
    <>
      <Link href={`/dashboard/${sidebarItem.path}`}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {sidebarItem.icon && <sidebarItem.icon />}
            </ListItemIcon>{" "}
            <ListItemText primary={sidebarItem.title} />
          </ListItemButton>
        </ListItem>
      </Link>
    </>
  );
};

export default MenuItems;
