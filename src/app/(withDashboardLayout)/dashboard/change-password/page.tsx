"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import KeyIcon from "@mui/icons-material/Key";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import GlobalForm from "@/components/Form/GlobalForm";
import GlobalInput from "@/components/Form/GlobalInput";
import logOutUser from "@/services/actions/logOutUser";
import { useUpdatePasswordMutation } from "@/redux/api/auth/authApi";

const validationSchema = z.object({
  oldPassword: z.string().min(6, "Must be at least 6 characters long"),
  newPassword: z.string().min(6, "Must be at least 6 characters long"),
});

const ChangePassword = () => {
  const [updatePassword] = useUpdatePasswordMutation();
  const router = useRouter();

  const onSubmit = async (values: FieldValues) => {
    try {
      const res = (await updatePassword(values)) as any;
      console.log(res, "Ppp");
      if (res?.data?.success) {
        logOutUser(router);
        toast.success(res.data.message);
      } else {
        toast.error(res.error.data);
        throw new Error("Incorrect Old Password");
      }
    } catch (error) {
      toast.success("Incorrect Old Password");
      console.log(error);
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
          mt: {
            xs: 2,
            md: 5,
          },
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
          <Typography variant="h5" fontWeight={600} sx={{ mb: 2, mt: -1.5 }}>
            Change password
          </Typography>
        </Stack>
        <GlobalForm
          onSubmit={onSubmit}
          defaultValues={{ oldPassword: "", newPassword: "" }}
          resolver={zodResolver(validationSchema)}
        >
          <Grid>
            <Grid item xs={12} sm={12} md={6}>
              <GlobalInput
                name="oldPassword"
                type="password"
                label="Old Password"
                fullWidth
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} mt={2}>
              <GlobalInput
                name="newPassword"
                type="password"
                label="New Password"
                fullWidth
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Button type="submit" sx={{ width: "100%", my: 2 }}>
            change Password
          </Button>
        </GlobalForm>
      </Box>
    </>
  );
};

export default ChangePassword;
