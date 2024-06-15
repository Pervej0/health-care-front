import { baseApi } from "../baseApi";
import { tagTypes } from "../tag-type";

const doctorScheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctorSchedule: build.mutation({
      query: (data) => {
        return {
          url: "/doctor-schedules/create-doctor-schedule",
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.doctorSchedule],
    }),
    getAllDoctorSchedule: build.query({
      query: () => {
        return {
          url: "/doctor-schedules",
          method: "GET",
        };
      },
      providesTags: [tagTypes.doctorSchedule],
    }),
    geMySchedule: build.query({
      query: (params) => {
        return {
          url: "/doctor-schedules/my-schedules",
          method: "GET",
          params: params,
        };
      },
      providesTags: [tagTypes.doctorSchedule],
    }),

    deleteDoctorSchedule: build.mutation({
      query: (id) => {
        return {
          url: `/doctor-schedules/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.doctorSchedule],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateDoctorScheduleMutation,
  useGetAllDoctorScheduleQuery,
  useGeMyScheduleQuery,
  useDeleteDoctorScheduleMutation,
} = doctorScheduleApi;
