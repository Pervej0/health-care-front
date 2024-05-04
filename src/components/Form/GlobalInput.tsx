import { SxProps, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IInput {
  name: string;
  size?: "small" | "medium";
  label: string;
  type?: string;
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  required: boolean;
}

const GlobalInput = ({
  name,
  size = "small",
  label,
  type = "text",
  fullWidth,
  placeholder,
  required,
  sx,
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
          variant="outlined"
          placeholder={label}
          required={required}
        />
      )}
    />
  );
};

export default GlobalInput;
