import { authKey } from "@/constant/authKey";
import { instance as AxiosInstance } from "@/helpers/axiosInstance";
import decodedToken from "@/utils/jwtDecode";
import {
  getTokenFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/localStorage";

export const storeUserInfo = (token: string) => {
  return setToLocalStorage(authKey, token);
};

export const isLoggedIn = () => {
  const authToken = getTokenFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};

export const getUserInfo = () => {
  const accessToken = getTokenFromLocalStorage(authKey) as string;
  if (accessToken) {
    const userInfo = decodedToken(accessToken);
    return userInfo;
  }
  return "";
};

export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};

export const getNewAccessToken = () => {
  return AxiosInstance({
    url: `${process.env.BACK_END_URL}/auth/refresh-token`,
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });
};
