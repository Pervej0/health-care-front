"use client";

import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import SpecialtiesModal from "../specialties/components/SpecialtiesModal";
import CreateDoctorModal from "./components/CreateDoctorModal";

const CreateDoctor = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Stack mt={10} justifyContent="space-between" direction="row" mb={6}>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Create Doctor
        </Button>
        <TextField size="small" placeholder="Search here" />
        <CreateDoctorModal open={open} setOpen={setOpen} />
      </Stack>
    </>
  );
};

export default CreateDoctor;
