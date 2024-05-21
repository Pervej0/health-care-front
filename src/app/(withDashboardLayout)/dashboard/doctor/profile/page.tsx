"use client";

import GlobalForm from "@/components/Form/GlobalForm";
import GlobalInput from "@/components/Form/GlobalInput";
import GlobalSelect from "@/components/Form/GlobalSelect";
import GlobalUploadFile from "@/components/Form/GlobalUploadFile";
import { genderOptions } from "@/constant/common";
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
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { Toaster, toast } from "sonner";
import DoctorInformation from "./components/DoctorInformation";
import AutoFileUploader from "@/components/Form/GlobalAutoUploader";
import Image from "next/image";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ProfileUpdateModal from "./components/ProfileUpdateModal";

const UpdateDoctorProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: user, isLoading } = useGetSingleUserQuery({});
  const [updateUser, { isLoading: uploading }] = useUpdateUserMutation();
  const router = useRouter();

  if (isLoading) {
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  const handleSubmit = async (values: FieldValues) => {
    values.doctor.experience = Number(values.doctor.experience);
    values.doctor.appointmentFee = Number(values.doctor.appointmentFee);
    console.log(values);

    const userData = { ...values.doctor, file: values.file };
    const data = convertToFormData(userData);

    try {
      const result = await updateUser(data).unwrap();
      if (result?.data?.id) {
        toast.success("Doctor Updated Successfully!!!");
        router.push("/dashboard/doctor");
      }
    } catch (err: any) {
      toast.error(err.data.message);
      console.log(err);
    }
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
    portfolio,
  } = user?.data;
  const defaultValues = {
    doctor: {
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
      profilePhoto: portfolio,
    },
  };

  const fileUploadHandler = async (file: File) => {
    const data = convertToFormData({ file: file });

    try {
      const result = await updateUser(data).unwrap();
      console.log(result);
    } catch (error: any) {
      toast.error(error.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Box mt={8}></Box>
      <>
        <ProfileUpdateModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          id={user?.data.id}
        />
        <Container sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            <Grid xs={12} md={4}>
              <Box
                sx={{
                  height: 300,
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: 1,
                }}
              >
                <Image
                  height={300}
                  width={400}
                  src={user.data.profilePhoto}
                  alt="User Photo"
                />
              </Box>
              <Box my={3}>
                {uploading ? (
                  <p>Uploading...</p>
                ) : (
                  <AutoFileUploader
                    name="file"
                    label="Choose Your Profile Photo"
                    icon={<CloudUploadIcon />}
                    onFileUpload={fileUploadHandler}
                    variant="text"
                  />
                )}
              </Box>
              <Button
                fullWidth
                endIcon={<ModeEditIcon />}
                onClick={() => setIsModalOpen(true)}
              >
                Edit Profile
              </Button>
            </Grid>
            <Grid xs={12} md={8}>
              <DoctorInformation doctorData={user.data} />
            </Grid>
          </Grid>
        </Container>
      </>
      {/* <Container>
        <Typography variant="h5" component="h5" mb={3} mt={8}>
          Update a Doctor
        </Typography>
        <GlobalForm defaultValues={defaultValues} onSubmit={handleSubmit}>
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
            <Grid item xs={12} sm={12} md={4}>
              <GlobalUploadFile
                name="file"
                size="small"
                label="Upload image"
                fullWidth={true}
              />
            </Grid>
          </Grid>
          <Button sx={{ mt: 2 }} type="submit">
            Update
          </Button>
        </GlobalForm>
      </Container> */}
    </>
  );
};

export default UpdateDoctorProfile;
