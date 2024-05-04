import { FieldValues } from "react-hook-form";

const convertToFormData = (values: FieldValues) => {
  const data = JSON.stringify(values);
  const modifyData = new FormData();
  modifyData.append("data", data);
  return modifyData;
};

export default convertToFormData;
