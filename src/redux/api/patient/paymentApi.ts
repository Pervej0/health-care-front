import { baseApi } from "../baseApi";
import { tagTypes } from "../tag-type";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    initialPayment: build.mutation({
      query: (id) => ({
        url: `/payment/init/${id}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.payment],
    }),
  }),
});

export const { useInitialPaymentMutation } = paymentApi;
