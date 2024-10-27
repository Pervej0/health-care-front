import { baseApi } from "../baseApi";

const AuthApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    changePassword: build.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        contentType: "application/json",
        data: data,
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = AuthApi;
