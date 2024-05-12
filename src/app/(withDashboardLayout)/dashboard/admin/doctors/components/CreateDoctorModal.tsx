import GlobalForm from "@/components/Form/GlobalForm";
import GlobalInput from "@/components/Form/GlobalInput";
import GlobalSelect from "@/components/Form/GlobalSelect";
import GlobalFullPageModal from "@/components/Shared/GlobalFullPageModal";
import { Label } from "@mui/icons-material";
import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";

type TModal = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateDoctorModal = ({ open, setOpen }: TModal) => {
  const handleSubmit = (values: FieldValues) => {
    console.log(values);
  };

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  return (
    <>
      <GlobalFullPageModal open={open} setOpen={setOpen}>
        <Container>
          <Typography variant="h5" component="h5" mb={3} mt={2}>
            Create a new Doctor
          </Typography>
          <GlobalForm onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item md={6}>
                <GlobalInput name="name" label="Name" fullWidth={true} />
              </Grid>
              <Grid item md={6}>
                <GlobalInput name="email" label="Email" fullWidth={true} />
              </Grid>
              <Grid item md={6}>
                <GlobalInput
                  name="contactNumber"
                  label="Contact Number"
                  fullWidth={true}
                />
              </Grid>
              <Grid item md={6}>
                <GlobalInput name="address" label="Address" fullWidth={true} />
              </Grid>
              <Grid item md={6}>
                <GlobalInput
                  name="registrationNumber"
                  label="Registration Number"
                  fullWidth={true}
                />
              </Grid>
              <Grid item md={6}>
                <GlobalInput
                  name="experience"
                  label="experience"
                  type="number"
                  fullWidth={true}
                />
              </Grid>
              <Grid item md={6}>
                <GlobalSelect
                  options={genderOptions}
                  name="gender"
                  label="Gender"
                  fullWidth={true}
                />
              </Grid>
            </Grid>
            <Button sx={{ mt: 2 }} type="submit">
              Create
            </Button>
          </GlobalForm>
        </Container>
      </GlobalFullPageModal>
    </>
  );
};

export default CreateDoctorModal;
