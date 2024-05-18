import GlobalDatePicker from "@/components/Form/GlobalDatePicker";
import GlobalForm from "@/components/Form/GlobalForm";
import GlobalModal from "@/components/Shared/GlobalModal";
import { useGetAllScheduleQuery } from "@/redux/api/admin/schedule/scheduleApi";
import { TModal } from "@/types";
import { Button, FormControl, Grid } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { FieldValue, FieldValues } from "react-hook-form";
import { Toaster } from "sonner";
import ScheduleMultiSelect from "./scheduleMultiSelect";
import GlobalSelect from "@/components/Form/GlobalSelect";
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DoctorScheduleModal = ({ open, setOpen }: TModal) => {
  const [selectDate, setSelectDate] = useState({
    startDateTime: dayjs(new Date())
      .hour(0)
      .minute(0)
      .millisecond(0)
      .toISOString(),
    endDateTime: dayjs(new Date())
      .hour(23)
      .minute(59)
      .millisecond(999)
      .toISOString(),
  });
  const { data: scheduleData, isLoading } = useGetAllScheduleQuery(selectDate);
  const [scheduleTime, setScheduleTime] = React.useState<string[]>([]);

  const handleDateChange = (value: any) => {
    const query: any = {};
    query["startDateTime"] = dayjs(value)
      .hour(0)
      .minute(0)
      .millisecond(0)
      .toISOString();
    query["endDateTime"] = dayjs(value)
      .hour(23)
      .minute(59)
      .millisecond(999)
      .toISOString();
    setSelectDate(query);
  };

  const handleSubmit = (e: any) => {
    console.log({ selectDate, scheduleTime }, "pxpxpx");
    e.preventDefault();
  };

  return (
    <>
      <Toaster position="top-center" />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GlobalModal
          title="Create a new Schedule"
          open={open}
          setOpen={setOpen}
        >
          <form style={{ padding: "30px" }} onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ width: "400px" }}>
              <Grid item xs={12}>
                <DesktopDatePicker
                  // value={(date: any) => dayjs(date) || dayjs(Date.now())}
                  // disablePast={true}
                  timezone="system"
                  onChange={handleDateChange}
                  slotProps={{ textField: { size: "small", fullWidth: true } }}
                  label="Select Date"
                />
              </Grid>
              <Grid item xs={12}>
                <ScheduleMultiSelect
                  scheduleData={scheduleData?.data}
                  scheduleTime={scheduleTime}
                  setScheduleTime={setScheduleTime}
                />
              </Grid>
            </Grid>
            <Button sx={{ mt: 2 }} type="submit">
              Create
            </Button>
          </form>
        </GlobalModal>
      </LocalizationProvider>
    </>
  );
};

export default DoctorScheduleModal;
