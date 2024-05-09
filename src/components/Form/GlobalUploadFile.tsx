import { Button, Input, TextField } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useForm, useFormContext } from "react-hook-form";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const GlobalUploadFile = ({ name, label }: any) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          {label || "Upload file"}
          <TextField
            {...field}
            value={value?.fileName || null}
            type={name}
            onChange={(e) => {
              const fileInput = e.target as HTMLInputElement;
              const file = fileInput.files?.[0];
              onChange(file);
            }}
            label={label}
            sx={{ display: "none" }}
          />
        </Button>
      )}
    />
  );
};

export default GlobalUploadFile;
