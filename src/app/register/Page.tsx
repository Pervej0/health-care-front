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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import convertToFormData from "@/utils/ConvertToFormData";
import { Toaster, toast } from "sonner";
import registerPatient from "@/services/actions/registerUser";
import GlobalForm from "@/components/Form/GlobalForm";
import GlobalInput from "@/components/Form/GlobalInput";
import { Global } from "@emotion/react";
import loginUser from "@/services/actions/loginUser";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.services";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Password } from "@mui/icons-material";

export interface TRegisterInput {
  password: string;
  patient: {
    name: string;
    email: string;
    contactNumber: string;
    address: string;
  };
}

const registerSchema = z.object({
  password: z.string({ required_error: "Please, Enter your password" }),
  patient: z.object({
    name: z.string({ required_error: "Please, Enter your name" }),
    email: z
      .string({ required_error: "Please, Enter your email" })
      .email("Please, Enter valid email"),
    contactNumber: z.string({
      required_error: "Please, Enter your number",
    }),
    address: z.string({ required_error: "Please, Enter your address" }),
  }),
});

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister: SubmitHandler<FieldValues> = async (
    data: FieldValues
  ) => {
    const formData = convertToFormData(data);
    const userInfo = await registerPatient(formData);
    if (userInfo.success) {
      const userLogin: FieldValues = await loginUser({
        email: data.patient.email,
        password: data.password,
      });
      if (userLogin.success) {
        toast.success("User logged in successfully!");
        router.push("/");
        storeUserInfo(userLogin.data.accessToken);
      }
    }
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
          <GlobalForm
            onSubmit={handleRegister}
            resolver={zodResolver(registerSchema)}
            defaultValues={{
              name: "",
              email: "",
              Password: "",
              contactNumber: "",
              address: "",
            }}
          >
            <GlobalInput
              name="patient.name"
              fullWidth={true}
              size="small"
              label="Name"
            />
            <Grid container spacing={2} mt={1} mb={3}>
              <Grid item md={6} sm={12} xs={12}>
                <GlobalInput
                  name="patient.email"
                  type="email"
                  fullWidth={true}
                  size="small"
                  label="Email"
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <GlobalInput
                  name="password"
                  fullWidth={true}
                  type="password"
                  size="small"
                  label="Password"
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <GlobalInput
                  name="patient.contactNumber"
                  fullWidth={true}
                  size="small"
                  label="Contact number"
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <GlobalInput
                  name="patient.address"
                  fullWidth={true}
                  size="small"
                  label="Address"
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </GlobalForm>
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
