import { TextField } from "@mui/material";
import React from "react";
import {
  Controller,
  FieldValues,
  useForm,
  useFormContext,
} from "react-hook-form";

interface IInput {
  name: string;
  size?: "small" | "medium";
  label: string;
  type?: string;
  fullWidth?: boolean;
}

const GlobalInput = ({
  name,
  size = "small",
  label,
  type = "text",
  fullWidth,
}: IInput) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          size={size}
          label={label}
          type={type}
          fullWidth={fullWidth}
        />
      )}
    />
  );
};

export default GlobalInput;
