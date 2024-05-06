import { baseApi } from "./api/baseApi";
import counterSlice from "./features/slice/counterSlice";

const reducer = {
  counter: counterSlice,
  [baseApi.reducerPath]: baseApi.reducer,
};

export default reducer;
