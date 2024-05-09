import { SxProps } from "@mui/material";
import React, { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  resolver?: any;
  defaultValues?: Record<string, any>;
};
type TFormData = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  sx?: any;
} & TFormConfig;

const GlobalForm = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
  sx,
}: TFormData) => {
  const formConfig: TFormConfig = {};

  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const submit = (data: FieldValues) => {
    onSubmit(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form style={sx} onSubmit={handleSubmit(submit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default GlobalForm;
