"use server";

import { cookies } from "next/headers";
import { authKey } from "@/constant/authKey";
import { redirect } from "next/navigation";

export const setAuthCookieToken = (token: string, option?: any) => {
  cookies().set(authKey, token);
  if (option && option.passwordChangeRequired) {
    redirect("/dashboard/change-password");
  }
  if (option && !option.passwordChangeRequired && option.redirect) {
    redirect(option.redirect);
  }
};

export const removeAuthCookieToken = (keys: string[]) => {
  keys.forEach((key) => {
    cookies().delete(key);
  });
};

export const getAuthCookieToken = () => {
  return cookies().get(authKey)?.value;
};
