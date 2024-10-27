import { baseApi } from "../baseApi";
import { tagTypes } from "../tag-type";

const AuthApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updatePassword: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/auth/change-password",
          method: "PUT",
          contentType: "application/json",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useUpdatePasswordMutation } = AuthApi;
