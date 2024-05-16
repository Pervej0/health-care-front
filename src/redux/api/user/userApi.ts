import { baseApi } from "../baseApi";
import { tagTypes } from "../tag-type";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: () => {
        return {
          url: "/users/me",
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `/users/me`,
        method: "PUT",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.admin, tagTypes.doctor],
    }),
  }),
});

export const { useGetSingleUserQuery, useUpdateUserMutation } = userApi;
