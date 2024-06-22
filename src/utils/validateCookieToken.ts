"use server";

import { authKey } from "@/constant/authKey";
import { removeUser } from "@/services/auth.services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const validateCookieToken = (token: string, option?: any) => {
  if (token) {
    cookies().set(authKey, token);
    console.log("saved cookies");
    if (option?.redirect) {
      redirect(option.redirect);
    }
  }
};

export default validateCookieToken;
