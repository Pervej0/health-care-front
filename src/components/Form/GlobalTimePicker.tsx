import { SxProps } from "@mui/material";
import { DesktopTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ITimePicker {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
}

const GlobalTimePicker = ({
  name,
  size = "small",
  label,
  required,
  fullWidth,
  sx,
}: ITimePicker) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs(new Date())}
      render={({ field: { onChange, onBlur, value, ref, ...field } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopTimePicker
            {...field}
            value={value || Date.now()}
            label={label}
            onChange={(time) => onChange(time)}
            slotProps={{
              textField: {
                size: size,
                required: required,
                sx: { ...sx },
                variant: "outlined",
                fullWidth: fullWidth,
                error: isError,
                helperText: isError
                  ? (formState.errors[name]?.message as string)
                  : "",
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default GlobalTimePicker;
