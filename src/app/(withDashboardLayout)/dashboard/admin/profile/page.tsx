"use client";

import GlobalForm from "@/components/Form/GlobalForm";
import GlobalInput from "@/components/Form/GlobalInput";
import GlobalUploadFile from "@/components/Form/GlobalUploadFile";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/redux/api/user/userApi";
import convertToFormData from "@/utils/ConvertToFormData";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues } from "react-hook-form";
import { Toaster, toast } from "sonner";

const DoctorProfile = () => {
  const router = useRouter();
  const { data: userData, isLoading } = useGetSingleUserQuery(null);
  const [updateDoctor] = useUpdateUserMutation();

  if (isLoading) {
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  const handleSubmit = async (values: FieldValues) => {
    const userData = { ...values.doctor, file: values.file };
    const data = convertToFormData(userData);
    try {
      const result = await updateDoctor(data).unwrap();
      if (result?.data?.id) {
        toast.success("Updated Successfully!!!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      toast.error(err.data.message);
      console.log(err);
    }
  };
  const { email, name, contactNumber, portfolio } = userData?.data;
  const defaultValues = {
    doctor: {
      email: email,
      name: name,
      contactNumber: contactNumber,
      profilePhoto: portfolio,
    },
  };

  return (
    <>
      <Toaster position="top-center" />
      <Container>
        <Typography variant="h5" component="h5" mb={3} mt={8}>
          Update a Doctor
        </Typography>
        <GlobalForm defaultValues={defaultValues} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <GlobalInput
                required={true}
                name="doctor.name"
                label="Name"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <GlobalInput
                required={true}
                name="doctor.email"
                label="Email"
                fullWidth={true}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <GlobalInput
                required={true}
                name="doctor.contactNumber"
                label="Contact Number"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <GlobalUploadFile
                name="file"
                size="small"
                label="Upload image"
                fullWidth={true}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <Button sx={{ mt: 2 }} type="submit">
            Update
          </Button>
        </GlobalForm>
      </Container>
    </>
  );
};

export default DoctorProfile;
