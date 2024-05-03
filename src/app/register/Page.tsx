import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import assets from "@/assets";
import Image from "next/image";
import { Margin } from "@mui/icons-material";
import Link from "next/link";

const page = () => {
  return (
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
        <FormControl>
          <TextField size="small" id="name" label="Name" variant="outlined" />
          <Grid container spacing={2} mt={1} mb={3}>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                fullWidth={true}
                size="small"
                id="email"
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                fullWidth={true}
                size="small"
                id="password"
                label="Password"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                fullWidth={true}
                size="small"
                id="contactNumber"
                label="Contact number"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                size="small"
                id="address"
                label="Address"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button type="button" variant="contained">
            Submit
          </Button>
        </FormControl>
        <Typography variant="body2" textAlign="center" mt={1}>
          Do you already have any account?{" "}
          <Link href="/login" style={{ color: "#0f33d3", fontWeight: 600 }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default page;
