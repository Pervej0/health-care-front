import { USER_ROLE } from "@/constant/userRole";
import { SvgIconProps, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
}

export type TUserRole = keyof typeof USER_ROLE;

export interface ISidebarItems {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  child?: ISidebarItems[];
}

export interface IResponse {
  data: any;
  meta?: IMeta;
}

export interface IErrorResponse {
  statusCode: number;
  message: string;
  errorMessages: IErrorMessage[];
}

interface IErrorMessage {
  path: string | number;
  message: string;
}
