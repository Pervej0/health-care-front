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
  }),
});

export const { useCreateAppointmentMutation } = appointmentApi;
