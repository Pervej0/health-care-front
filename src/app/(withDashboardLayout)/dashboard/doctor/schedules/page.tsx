"use client";

import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { Toaster } from "sonner";
import DoctorScheduleModal from "./components/doctorScheduleModal";
import { useGetAllDoctorScheduleQuery } from "@/redux/api/doctor/doctorScheduleApi";

const DoctorSchedule = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetAllDoctorScheduleQuery({});
  // console.log(data)
  return (
    <>
      <Toaster position="top-center" />
      <Stack mt={10} justifyContent="space-between" direction="row" mb={6}>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Choose Schedule
        </Button>
        <TextField size="small" placeholder="Search here" />
        <DoctorScheduleModal open={open} setOpen={setOpen} />
      </Stack>
    </>
  );
};

export default DoctorSchedule;
