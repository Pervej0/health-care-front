import { baseApi } from "../../baseApi";
import { tagTypes } from "../../tag-type";

const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSchedule: build.mutation({
      query: (data) => {
        return {
          url: "/schedules/create-schedule",
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.schedule],
    }),
    getAllSchedule: build.query({
      query: (args) => {
        return {
          url: "/schedules",
          method: "GET",
          params: args,
        };
      },
      providesTags: [tagTypes.schedule, tagTypes.doctorSchedule],
    }),
    deleteSchedule: build.mutation({
      query: (id) => {
        return {
          url: `/schedules/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.schedule],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateScheduleMutation,
  useGetAllScheduleQuery,
  useDeleteScheduleMutation,
} = scheduleApi;
