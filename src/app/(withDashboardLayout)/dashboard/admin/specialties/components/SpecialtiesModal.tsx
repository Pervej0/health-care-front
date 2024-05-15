"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import GlobalForm from "@/components/Form/GlobalForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import GlobalInput from "@/components/Form/GlobalInput";
import GlobalUploadFile from "@/components/Form/GlobalUploadFile";
import convertToFormData from "@/utils/ConvertToFormData";
import { useCreateSpecialtyMutation } from "@/redux/api/specialties/specialtiesApi";
import { Toaster, toast } from "sonner";
import GlobalModal from "@/components/Shared/GlobalModal";
import { Result } from "postcss";

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
    try {
      const result = await createSpecialty(data).unwrap();
      if (result.data.id) {
        toast.success(result.message);
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err.data.message);
      console.log(err);
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
              <GlobalUploadFile
                buttonStyle={{ backgroundColor: "black" }}
                name="file"
                label="Upload image"
              />
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
