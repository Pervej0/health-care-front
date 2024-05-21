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

  if (isLoading) {
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

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
          user={user}
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
                  src={user?.data?.profilePhoto}
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
              <DoctorInformation doctorData={user?.data} />
            </Grid>
          </Grid>
        </Container>
      </>
    </>
  );
};

export default UpdateDoctorProfile;
