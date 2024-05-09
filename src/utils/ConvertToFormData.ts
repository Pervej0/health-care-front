import { FieldValues } from "react-hook-form";

const convertToFormData = (values: FieldValues) => {
  const obj = { ...values };
  const file = obj["file"];
  delete obj["file"];
  const data = JSON.stringify(obj);
  const modifyData = new FormData();
  modifyData.append("data", data);
  modifyData.append("file", file as Blob);
  return modifyData;
};

export default convertToFormData;
