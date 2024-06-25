// "use server";

import { setAuthCookieToken } from "@/utils/validateCookieToken";
import { FieldValues } from "react-hook-form";

export const loginUser = async (data: FieldValues) => {
  const response = await fetch(`${process.env.BACK_END_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
    // cache: "no-store",
  });
  const result = await response.json();
  setAuthCookieToken(result.data.accessToken, { redirect: "/dashboard" });
  return result;
};
