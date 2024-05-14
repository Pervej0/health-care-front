import GlobalDatePicker from "@/components/Form/GlobalDatePicker";
import GlobalForm from "@/components/Form/GlobalForm";
import GlobalInput from "@/components/Form/GlobalInput";
import GlobalTimePicker from "@/components/Form/GlobalTimePicker";
import GlobalUploadFile from "@/components/Form/GlobalUploadFile";
import GlobalModal from "@/components/Shared/GlobalModal";
import dateFormatter from "@/utils/dateFormatter";
import timeFormatter from "@/utils/timeFormatter";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { Toaster } from "sonner";

type TModal = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateScheduleModal = ({ open, setOpen }: TModal) => {
  const handleSubmit = (values: FieldValues) => {
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);
    values.startTime = timeFormatter(values.startTime);
    values.endTime = timeFormatter(values.endTime);
    console.log(values);
  };

  return (
    <React.Fragment>
      <Toaster position="top-center" />
      <GlobalModal title="Create a new Schedule" open={open} setOpen={setOpen}>
        <GlobalForm sx={{ padding: "30px" }} onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ width: "400px" }}>
            <Grid item md={12}>
              <GlobalDatePicker name="startDate" label="Start date" />
            </Grid>
            <Grid item md={12}>
              <GlobalDatePicker name="endDate" label="End date" />
            </Grid>
            <Grid item md={6}>
              <GlobalTimePicker name="startTime" label="Start time" />
            </Grid>
            <Grid item md={6}>
              <GlobalTimePicker name="endTime" label="End time" />
            </Grid>
          </Grid>
          <Button sx={{ mt: 2 }} type="submit">
            Create
          </Button>
        </GlobalForm>
      </GlobalModal>
    </React.Fragment>
  );
};

export default CreateScheduleModal;
