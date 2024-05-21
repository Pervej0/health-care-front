import GlobalForm from "@/components/Form/GlobalForm";
import GlobalInput from "@/components/Form/GlobalInput";
import GlobalSelect from "@/components/Form/GlobalSelect";
import GlobalFullPageModal from "@/components/Shared/GlobalFullPageModal";
import { genderOptions } from "@/constant/common";
import { TModal } from "@/types";
import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";

const ProfileUpdateModal = ({ open, setOpen, id }: TModal & { id: string }) => {
  const handleSubmit = (values: FieldValues) => {
    console.log(values);
  };
  return (
    <>
      <GlobalFullPageModal open={open} setOpen={setOpen}>
        <Container>
          <Typography variant="h5" component="h5" mb={3} mt={2}>
            Update Your Profile
          </Typography>
          <GlobalForm onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="doctor.name"
                  label="Name"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="doctor.email"
                  label="Email"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="doctor.contactNumber"
                  label="Contact Number"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="doctor.address"
                  label="Address"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="doctor.registrationNumber"
                  label="Registration Number"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="doctor.experience"
                  label="experience"
                  type="number"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalSelect
                  required={true}
                  options={genderOptions}
                  name="doctor.gender"
                  size="small"
                  label="Gender"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="doctor.appointmentFee"
                  size="small"
                  type="number"
                  label="Appointment Fee"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="doctor.qualification"
                  size="small"
                  label="Qualification"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="doctor.currentWorkingPlace"
                  size="small"
                  label="Current Working Place"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="doctor.designation"
                  size="small"
                  label="Designation"
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

export default ProfileUpdateModal;
