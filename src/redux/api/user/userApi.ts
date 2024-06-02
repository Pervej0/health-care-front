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
      providesTags: [tagTypes.user, tagTypes.doctor],
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: "/users/me",
        method: "PUT",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.admin, tagTypes.doctor, tagTypes.user],
    }),
  }),
});

export const { useGetSingleUserQuery, useUpdateUserMutation } = userApi;
