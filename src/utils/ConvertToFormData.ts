import { TRegisterInput } from "@/app/register/page";

const convertToFormData = (values: TRegisterInput) => {
  const data = JSON.stringify(values);
  const modifyData = new FormData();
  modifyData.append("data", data);
  return modifyData;
};

export default convertToFormData;
