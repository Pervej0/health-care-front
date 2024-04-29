import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";

const Navbar = () => {
  return (
    <Container>
      <Stack direction="row">
        <Typography variant="h5" component="h5">
          P<Box component="span">H</Box> Health Care
        </Typography>
      </Stack>
    </Container>
  );
};

export default Navbar;
