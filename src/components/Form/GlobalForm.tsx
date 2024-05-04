import React, { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface IFormData {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
}

const GlobalForm = ({ children, onSubmit }: IFormData) => {
  const methods = useForm();
  const { handleSubmit } = methods;

  const submit = (data: FieldValues) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default GlobalForm;
