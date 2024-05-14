"use client";

import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import GlobalModal from "@/components/Shared/GlobalModal";
import CreateScheduleModal from "./components/CreateScheduleModal";

const CreateSchedule = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Stack mt={10} justifyContent="space-between" direction="row" mb={6}>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Create Schedule
        </Button>
        <TextField size="small" placeholder="Search here" />
        <CreateScheduleModal open={open} setOpen={setOpen} />
      </Stack>
    </>
  );
};

export default CreateSchedule;
