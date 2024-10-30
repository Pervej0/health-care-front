"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import KeyIcon from "@mui/icons-material/Key";
import GlobalForm from "@/components/Form/GlobalForm";
import { z } from "zod";
import GlobalInput from "@/components/Form/GlobalInput";
import { FieldValues } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { authKey } from "@/constant/authKey";
import { removeAuthCookieToken } from "@/utils/validateCookieToken";
import { useResetPasswordMutation } from "@/redux/api/auth/authApi";
import { useSearchParams, useRouter } from "next/navigation";
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/localStorage";

const validationSchema = z.object({
  newPassword: z.string().min(6, "Must be at least 6 characters long"),
});
const ResetPassword = () => {
  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("userId");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) return;
    setToLocalStorage(authKey, token);
  }, [token]);

  const onSubmit = async (values: FieldValues) => {
    const updatedData = { ...values, id };
    try {
      const res = (await resetPassword(updatedData)) as any;
      if (res?.data?.success) {
        toast.success(res.data.message || "Password Reset Successful");
        removeFromLocalStorage(authKey);
        removeAuthCookieToken([authKey, "refreshToken"]);
        router.push("/login");
      } else {
        toast.error(res.error.data || "Something Went Wrong, Try Again");
      }
    } catch (error) {
      toast.success("Something Went Wrong, Try Again");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Box
        sx={{
          px: 4,
          py: 2,
          maxWidth: 600,
          width: "100%",
          boxShadow: 1,
          borderRadius: 1,
          mx: "auto",
          mt: { xs: 2, md: 10 },
        }}
      >
        <Stack alignItems="center" justifyContent="center">
          <Box
            sx={{
              "& svg": {
                width: 100,
                height: 100,
              },
            }}
          >
            <KeyIcon sx={{ color: "primary.main" }} />
          </Box>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
            Reset password
          </Typography>
        </Stack>
        <GlobalForm
          onSubmit={onSubmit}
          defaultValues={{ newPassword: "" }}
          resolver={zodResolver(validationSchema)}
        >
          <Grid>
            <Grid item xs={12} sm={12} md={6}>
              <GlobalInput
                name="newPassword"
                type="password"
                label="New Password"
                sx={{ mb: 2 }}
                fullWidth
              />
            </Grid>
          </Grid>

          <Button type="submit" sx={{ width: "100%", my: 2 }}>
            Reset Password
          </Button>
        </GlobalForm>
      </Box>
    </>
  );
};

export default ResetPassword;
