import { authKey } from "@/constant/authKey";
import { IErrorResponse, IResponse } from "@/types";
import { getTokenFromLocalStorage } from "@/utils/localStorage";
import axios from "axios";

const instance = axios.create();
//   default headers must include in production grade
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

//   interceptors
instance.interceptors.request.use(
  function (config) {
    const accessToken = getTokenFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  // @ts-ignore
  function (response) {
    const responseObj: IResponse = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObj;
  },
  function (error) {
    const errorResponse: IErrorResponse = {
      statusCode: error.response.data.statusCode || 500,
      message: error.response.data.message || "Something Went Wrong !!!",
      errorMessages: error?.response?.data?.message,
    };
    return Promise.reject(errorResponse);
  }
);

export { instance };
