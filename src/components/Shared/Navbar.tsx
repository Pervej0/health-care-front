"use client";

import logOutUser from "@/services/actions/logOutUser";
import { getUserInfo } from "@/services/auth.services";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const user = getUserInfo();
  const router = useRouter();
  return (
    <Container>
      <Stack py={3} direction="row" justifyContent="space-between">
        <Typography variant="h5" component="h5" fontWeight={600}>
          P
          <Box component="span" color="primary.main">
            H{" "}
          </Box>
          Health Care
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={4}
        >
          <Typography component={Link} href="/consultation">
            Consultation
          </Typography>
          <Typography>Health Plans</Typography>
          <Typography>Medicine</Typography>
          <Typography>Diagnostics</Typography>
          <Typography>NGOs</Typography>
          {user && (
            <Typography component={Link} href="/dashboard">
              Dashboard
            </Typography>
          )}
        </Stack>
        {!user ? (
          <Button LinkComponent={Link} href="/login">
            Login
          </Button>
        ) : (
          <Button
            onClick={() => logOutUser(router)}
            color="error"
            LinkComponent={Link}
            variant="contained"
          >
            Logout
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default Navbar;
