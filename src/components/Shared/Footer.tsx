import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <Box bgcolor="#2E4053">
      <Container>
        <Stack
          py={4}
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={4}
        >
          <Typography color="#ffffff" component={Link} href="/consultation">
            Consultation
          </Typography>
          <Typography color="#ffffff">Health Plans</Typography>
          <Typography color="#ffffff">Medicine</Typography>
          <Typography color="#ffffff">Diagnostics</Typography>
          <Typography color="#ffffff">NGOs</Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
