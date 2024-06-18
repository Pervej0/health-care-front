import GlobalForm from "@/components/Form/GlobalForm";
import GlobalInput from "@/components/Form/GlobalInput";
import GlobalSelect from "@/components/Form/GlobalSelect";
import GlobalFullPageModal from "@/components/Shared/GlobalFullPageModal";
import { genderOptions } from "@/constant/common";
import { useGetAllSpecialtyQuery } from "@/redux/api/admin/specialties/specialtiesApi";
import { IResponse, TModal } from "@/types";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import MultiSpecialtySelect from "./MultiSpecialtySelect";
import { useUpdateDoctorMutation } from "@/redux/api/admin/doctor/doctorApi";
import { Toaster, toast } from "sonner";
import { coerce, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const DoctorSchema = z.object({
  name: z.string({ required_error: "Please, Enter your name" }),
  email: z
    .string({ required_error: "Please, Enter your email" })
    .email("Please, Enter valid email"),
  contactNumber: z.string({
    required_error: "Please, Enter your contactNumber",
  }),
  address: z.string({ required_error: "Please, Enter your address" }),
  registrationNumber: z.string({
    required_error: "Please, Enter your registration",
  }),
  experience: z.preprocess(
    (x) => (x ? x : undefined),
    z.coerce.number().int().optional()
  ),
  gender: z.enum(["Male", "Female"], {
    required_error: "Please, Select your gender",
  }),
  appointmentFee: z.preprocess(
    (x) => (x ? x : undefined),
    z.coerce.number().int().optional()
  ),
  qualification: z.string({
    required_error: "Please, Enter your qualification",
  }),
  currentWorkingPlace: z.string({
    required_error: "Please, Enter your password",
  }),
  designation: z.string({ required_error: "Please, Enter your password" }),
});

const ProfileUpdateModal = ({
  open,
  setOpen,
  id,
  user,
}: TModal & { id: string; user: any }) => {
  const {
    data: specialtyData,
    isLoading,
    isSuccess,
  } = useGetAllSpecialtyQuery({});
  const [selectedSpecialty, setSelectedSpecialty] = useState([]);
  const [updateDoctor] = useUpdateDoctorMutation();

  useEffect(() => {
    const ids = user?.data?.doctorSpecialties?.map(
      (item: any) => item.specialties.id
    );
    setSelectedSpecialty(ids);
  }, [isSuccess]);

  if (isLoading && user) {
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  const handleSubmit = async (values: FieldValues) => {
    const data = {
      id,
      updatedData: {
        ...values,
        doctorSpecialties: selectedSpecialty.map((item) => ({
          specialtiesId: item,
          isDeleted: false,
        })),
      },
    };

    try {
      const result = (await updateDoctor(data).unwrap()) as IResponse;
      if (result.success) {
        toast.success(result.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.success(error.data.message);
    }
    setOpen(false);
  };

  const {
    email,
    name,
    contactNumber,
    address,
    registrationNumber,
    gender,
    experience,
    appointmentFee,
    qualification,
    currentWorkingPlace,
    designation,
  } = user?.data;

  const defaultValues = {
    email: email,
    name: name,
    contactNumber: contactNumber,
    address: address,
    registrationNumber: registrationNumber,
    gender: gender,
    experience: experience,
    appointmentFee: appointmentFee,
    qualification: qualification,
    currentWorkingPlace: currentWorkingPlace,
    designation: designation,
  };

  return (
    <>
      <Toaster position="top-center" />
      <GlobalFullPageModal open={open} setOpen={setOpen}>
        <Container>
          <Typography variant="h5" component="h5" mb={3} mt={2}>
            Update Your Profile
          </Typography>
          <GlobalForm
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            resolver={zodResolver(DoctorSchema)}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="name"
                  label="Name"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="email"
                  label="Email"
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="contactNumber"
                  label="Contact Number"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="address"
                  label="Address"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="registrationNumber"
                  label="Registration Number"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="experience"
                  label="experience"
                  type="number"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalSelect
                  required={true}
                  options={genderOptions}
                  name="gender"
                  size="small"
                  label="Gender"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="appointmentFee"
                  size="small"
                  type="number"
                  label="Appointment Fee"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="qualification"
                  size="small"
                  label="Qualification"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="currentWorkingPlace"
                  size="small"
                  label="Current Working Place"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GlobalInput
                  required={true}
                  name="designation"
                  size="small"
                  label="Designation"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <MultiSpecialtySelect
                  selectedSpecialty={selectedSpecialty}
                  setSelectedSpecialty={setSelectedSpecialty}
                  specialtyData={specialtyData?.data}
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
