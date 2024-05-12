import { baseApi } from "../baseApi";
import { tagTypes } from "../tag-type";

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSpecialty: build.mutation({
      query: (data) => {
        return {
          url: "/specialists/create-specialist",
          method: "POST",
          contentType: "multipart/form-data",
          data,
        };
      },
      invalidatesTags: [tagTypes.specialty],
    }),
    getAllSpecialty: build.query({
      query: () => {
        return {
          url: "/specialists",
          method: "GET",
        };
      },
      providesTags: [tagTypes.specialty],
    }),
    deleteSpecialty: build.mutation({
      query: (id) => {
        return {
          url: `/specialists/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.specialty],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateSpecialtyMutation,
  useGetAllSpecialtyQuery,
  useDeleteSpecialtyMutation,
} = specialtiesApi;
