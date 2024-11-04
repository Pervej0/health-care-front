import { IMeta } from "@/types";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { instance as AxiosInstance } from "./axiosInstance";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      IMeta?: IMeta;
      contentType?: string;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers, contentType }) => {
    try {
      const result = await AxiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          "content-type": contentType || "application/json",
        },
      });
      return result;
    } catch (axiosError) {
      const err = axiosError as any;
      return {
        error: {
          success: err.success,
          statusCode: err.statusCode,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
