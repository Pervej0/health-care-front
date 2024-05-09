import { baseApi } from "../baseApi";

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
    }),
    getAllSpecialty: build.query({
      query: () => {
        return {
          url: "/specialists",
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useCreateSpecialtyMutation, useGetAllSpecialtyQuery } =
  specialtiesApi;
