"use server";

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
    cache: "no-store",
  });
  const userInfo = await response.json();
  const passwordChangeRequired = userInfo.data?.needPasswordChange;
  if (userInfo.success === false) {
    return userInfo;
  }
  if (userInfo.data.accessToken) {
    setAuthCookieToken(userInfo.data.accessToken, {
      redirect: "/dashboard",
      passwordChangeRequired,
    });
    return userInfo;
  }
};
