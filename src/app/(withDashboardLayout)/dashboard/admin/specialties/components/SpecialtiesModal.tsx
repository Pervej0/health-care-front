"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import GlobalForm from "@/components/Form/GlobalForm";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import GlobalInput from "@/components/Form/GlobalInput";
import GlobalUploadFile from "@/components/Form/GlobalUploadFile";
import convertToFormData from "@/utils/ConvertToFormData";
import { useCreateSpecialtyMutation } from "@/redux/api/specialties/specialtiesApi";
import { Toaster, toast } from "sonner";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type TGlobalModal = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SpecialtiesModal({ open, setOpen }: TGlobalModal) {
  const [createSpecialty] = useCreateSpecialtyMutation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (
    values: FieldValues
  ) => {
    const data = convertToFormData(values);
    const result = await createSpecialty(data).unwrap();
    if (result.data.id) {
      toast.success(result.message);
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Toaster position="top-center" />

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, pb: 0 }} id="customized-dialog-title">
          Create a New Specialty
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <GlobalForm sx={{ padding: "30px" }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <GlobalInput name="title" label="Specialty" />
            </Grid>
            <Grid item md={6}>
              <GlobalUploadFile name="file" label="Upload image" />
            </Grid>
          </Grid>
          <Button sx={{ mt: 2 }} type="submit">
            Create
          </Button>
        </GlobalForm>
      </BootstrapDialog>
    </React.Fragment>
  );
}
