"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import GlobalForm from "@/components/Form/GlobalForm";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import GlobalInput from "@/components/Form/GlobalInput";
import GlobalUploadFile from "@/components/Form/GlobalUploadFile";
import convertToFormData from "@/utils/ConvertToFormData";
import {
  useCreateSpecialtyMutation,
  useGetAllSpecialtyQuery,
} from "@/redux/api/specialties/specialtiesApi";
import { Toaster, toast } from "sonner";
import GlobalModal, { BootstrapDialog } from "@/components/Shared/GlobalModal";

type TModal = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SpecialtiesModal({ open, setOpen }: TModal) {
  const [createSpecialty] = useCreateSpecialtyMutation();

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
      <GlobalModal title="Create a new Specialty" open={open} setOpen={setOpen}>
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
      </GlobalModal>
    </React.Fragment>
  );
}
