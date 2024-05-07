import { authKey } from "@/constant/authKey";
import decodedToken from "@/utils/jwtDecode";
import {
  getTokenFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/localStorage";
export const storeUserInfo = (token: string) => {
  return setToLocalStorage(authKey, token);
};

export const getUserInfo = () => {
  const token = getTokenFromLocalStorage(authKey) as string;
  if (token) {
    const userInfo = decodedToken(token);
    return userInfo;
  }
  return "";
};

export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};
