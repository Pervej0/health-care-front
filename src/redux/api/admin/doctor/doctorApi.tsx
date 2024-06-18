import { baseApi } from "../../baseApi";
import { tagTypes } from "../../tag-type";

const DoctorApi = baseApi.injectEndpoints({
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
    getAllDoctor: build.query({
      query: (args) => {
        return {
          url: "/doctors",
          method: "GET",
          params: args,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data,
          meta: response.meta,
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
    singleDoctor: build.query({
      query: (doctorId) => {
        return {
          url: `/doctors/${doctorId}`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data,
        };
      },
    }),
    updateDoctor: build.mutation({
      query: (data) => ({
        url: `/doctors/${data.id}`,
        method: "PATCH",
        contentType: "application/json",
        data: data.updatedData,
      }),
      invalidatesTags: [tagTypes.admin, tagTypes.doctor, tagTypes.user],
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetAllDoctorQuery,
  useDeleteAdminMutation,
  useSingleDoctorQuery,
  useUpdateDoctorMutation,
} = DoctorApi;
