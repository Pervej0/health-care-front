import { MenuItem, SxProps, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type TOptions = {
  value: string;
  label: string;
};

interface ISelect {
  name: string;
  size?: "small" | "medium";
  label: string;
  type?: string;
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
  options: TOptions[];
}

const GlobalSelect = ({
  name,
  label,
  fullWidth,
  sx,
  placeholder,
  required,
  options,
  size,
}: ISelect) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <TextField
          select
          label={label}
          size={size}
          onChange={onChange}
          onBlur={onBlur}
          sx={sx}
          required={required}
          error={!!error?.message}
          helperText={error?.message}
          placeholder={placeholder}
          fullWidth={fullWidth}
        >
          {options?.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default GlobalSelect;
