import { baseApi } from "../baseApi";
import { tagTypes } from "../tag-type";

const AdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctor: build.mutation({
      query: (data) => ({
        url: "/users/create-doctor",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    getAllAdmins: build.query({
      query: () => {
        return {
          url: "/doctors",
          method: "GET",
        };
      },
      providesTags: [tagTypes.admin],
    }),
    deleteAdmin: build.mutation({
      query: (id) => {
        return {
          url: `/doctors/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetAllAdminsQuery,
  useDeleteAdminMutation,
} = AdminApi;
