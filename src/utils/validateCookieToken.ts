"use server";

import { authKey } from "@/constant/authKey";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const setAuthCookieToken = (token: string, option?: any) => {
  if (token) {
    cookies().set(authKey, token);
    if (option?.redirect) {
      redirect(option.redirect);
    }
  }
};

export const removeAuthCookieToken = () => {
  cookies().delete(authKey);
};
