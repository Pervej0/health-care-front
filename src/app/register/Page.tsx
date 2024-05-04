"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import assets from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import convertToFormData from "@/utils/ConvertToFormData";
import { Toaster, toast } from "sonner";
import registerPatient from "@/services/actions/registerUser";

export interface TRegisterInput {
  password: string;
  patient: {
    name: string;
    email: string;
    contactNumber: string;
    address: string;
  };
}

const RegisterPage = () => {
  const { register, handleSubmit, reset } = useForm<TRegisterInput>();

  const onSubmit: SubmitHandler<TRegisterInput> = async (
    data: TRegisterInput
  ) => {
    const formData = convertToFormData(data);
    const userInfo = await registerPatient(formData);
    if (userInfo.success) {
      toast.success("User Created successfully!");
    }
    reset();
  };

  return (
    <>
      <Toaster position="top-center" />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            padding: 4,
            width: 500,
            boxShadow: ".7px 2px 6px 1px rgba(0,0,0,0.5)",
          }}
        >
          <Box textAlign="center" mb={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                gap: "10px 0px",

                "& img": {
                  margin: "0 auto",
                },
              }}
            >
              <Image
                src={assets.svgs.logo}
                alt="login logo"
                width="40"
                height="40"
              />
              <Typography component="h5" variant="h5" fontWeight={700}>
                Patient Register
              </Typography>
            </Box>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth={true}
              size="small"
              id="name"
              label="Name"
              variant="outlined"
              {...register("patient.name")}
            />
            <Grid container spacing={2} mt={1} mb={3}>
              <Grid item md={6} sm={12} xs={12}>
                <TextField
                  fullWidth={true}
                  size="small"
                  id="email"
                  label="Email"
                  variant="outlined"
                  {...register("patient.email")}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <TextField
                  fullWidth={true}
                  type="password"
                  size="small"
                  id="password"
                  label="Password"
                  variant="outlined"
                  {...register("password")}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <TextField
                  fullWidth={true}
                  size="small"
                  id="contactNumber"
                  label="Contact number"
                  variant="outlined"
                  {...register("patient.contactNumber")}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <TextField
                  size="small"
                  id="address"
                  label="Address"
                  variant="outlined"
                  {...register("patient.address")}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </form>
          <Typography variant="body2" textAlign="center" mt={1}>
            Do you already have any account?{" "}
            <Link href="/login" style={{ color: "#0f33d3", fontWeight: 600 }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default RegisterPage;
