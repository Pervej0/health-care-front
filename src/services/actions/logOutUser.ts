import { authKey } from "@/constant/authKey";
import { removeUser } from "@/services/auth.services";
import { removeAuthCookieToken } from "@/utils/validateCookieToken";

const logOutUser = (router: any) => {
  removeUser();
  removeAuthCookieToken([authKey, "refreshToken"]);
  router.push("/");
  router.refresh();
};

export default logOutUser;
