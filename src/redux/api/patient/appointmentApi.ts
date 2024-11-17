import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "../tag-type";

const appointmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAppointment: build.mutation({
      query: (data) => ({
        url: "/appointments/create-appointment",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.appointment],
    }),
    getAllAppointments: build.query({
      query: (args: Record<string, any>) => ({
        url: "/appointments",
        method: "GET",
        params: args,
      }),
      transformResponse: (response: [], meta: IMeta) => {
        return {
          appointments: response,
          meta,
        };
      },
      providesTags: [tagTypes.appointment],
    }),
    getMyAppointment: build.query({
      query: (args: Record<string, any>) => ({
        url: "/appointments/my-appointment",
        method: "GET",
        params: args,
      }),
      transformResponse: (response: [], meta: IMeta) => {
        return {
          appointments: response,
          meta,
        };
      },
      providesTags: [tagTypes.appointment],
    }),
    getAppointment: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/appointments/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.appointment],
    }),
    appointmentStatusChange: build.mutation({
      query: (data) => ({
        url: `/appointment/status/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.appointment],
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useAppointmentStatusChangeMutation,
  useGetAllAppointmentsQuery,
  useGetMyAppointmentQuery,
  useGetAppointmentQuery,
} = appointmentApi;
