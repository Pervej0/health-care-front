"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import assets from "@/assets";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { loginUser } from "@/services/actions/loginUser";
import { Toaster, toast } from "sonner";
import { storeUserInfo } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import GlobalForm from "@/components/Form/GlobalForm";
import GlobalInput from "@/components/Form/GlobalInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Please, Enter your email" })
    .email("Please, Enter valid email"),
  password: z.string({ required_error: "Please, Enter your password" }),
});

const LoginPage = () => {
  const router = useRouter();

  const handleLogin: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    const userInfo: FieldValues = await loginUser(data);
    if (userInfo.success) {
      toast.success("Logged in successfully.");
      router.push("/dashboard");
      storeUserInfo(userInfo.data.accessToken);
    } else {
      toast.error((userInfo?.message as string) || "something went wrong");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Container>
        <Stack
          sx={{
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: 600,
              width: "100%",
              boxShadow: 1,
              borderRadius: 1,
              p: 4,
              textAlign: "center",
            }}
          >
            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Image
                  src={assets.svgs.logo}
                  width={50}
                  height={50}
                  alt="logo"
                />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  Login PH HealthCare
                </Typography>
              </Box>
            </Stack>
            <Box>
              <GlobalForm
                onSubmit={handleLogin}
                resolver={zodResolver(loginSchema)}
                defaultValues={{ email: "", password: "" }}
              >
                <Grid container spacing={2} my={1}>
                  <Grid item md={6}>
                    <GlobalInput
                      name="email"
                      size="small"
                      label="Email"
                      type="email"
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <GlobalInput
                      name="password"
                      size="small"
                      label="Password"
                      type="password"
                      fullWidth={true}
                    />
                  </Grid>
                </Grid>

                <Typography
                  mb={1}
                  textAlign="end"
                  variant="body2"
                  component="p"
                  fontWeight={300}
                  sx={{
                    textDecoration: "underline",
                  }}
                >
                  <Link href={"/forgot-password"}>Forgot Password?</Link>
                </Typography>

                <Button
                  sx={{
                    margin: "10px 0px",
                  }}
                  fullWidth={true}
                  type="submit"
                >
                  Login
                </Button>
                <Typography variant="body2" component="p" fontWeight={300}>
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    style={{ color: "#0f33d3", fontWeight: 600 }}
                  >
                    Create an account
                  </Link>
                </Typography>
              </GlobalForm>
            </Box>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default LoginPage;
