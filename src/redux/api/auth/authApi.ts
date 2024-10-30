import { baseApi } from "../baseApi";
import { tagTypes } from "../tag-type";

const AuthApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updatePassword: build.mutation({
      query: (data) => {
        return {
          url: "/auth/change-password",
          method: "PUT",
          contentType: "application/json",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    forgotPassword: build.mutation({
      query: (data) => ({ url: "/auth/forgot-password", method: "PUT", data }),
      invalidatesTags: [tagTypes.user],
    }),
    resetPassword: build.mutation({
      query: (data) => ({ url: "/auth/reset-password", method: "PUT", data }),
    }),
  }),
});

export const {
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = AuthApi;
