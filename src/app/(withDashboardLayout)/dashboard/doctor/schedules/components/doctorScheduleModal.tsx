import GlobalDatePicker from "@/components/Form/GlobalDatePicker";
import GlobalForm from "@/components/Form/GlobalForm";
import GlobalModal from "@/components/Shared/GlobalModal";
import {
  useCreateScheduleMutation,
  useGetAllScheduleQuery,
} from "@/redux/api/admin/schedule/scheduleApi";
import { TModal } from "@/types";
import { Button, Grid } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import ScheduleMultiSelect from "./scheduleMultiSelect";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoadingButton from "@mui/lab/LoadingButton";

import { useCreateDoctorScheduleMutation } from "@/redux/api/doctor/doctorScheduleApi";

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
  const [selectedSchedule, setSelectedSchedule] = React.useState<string[]>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [createDoctorSchedule] = useCreateDoctorScheduleMutation();

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

  const handleSubmit = async (e: any) => {
    setLoadingButton(true);
    const data = { schedules: [...selectedSchedule] };
    console.log(data, "xx");
    try {
      const result = await createDoctorSchedule(data).unwrap();
      console.log(result, "eree");
      if (result.success) {
        toast.success(result.message);
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err.data.message);
      console.log(err);
    }
    setSelectedSchedule([]);
    setLoadingButton(false);
    setOpen(false);
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
                selectedSchedule={selectedSchedule}
                setSelectedSchedule={setSelectedSchedule}
              />
            </Grid>
          </Grid>
          <LoadingButton
            onClick={handleSubmit}
            variant="outlined"
            loading={loadingButton}
            sx={{ mt: 2 }}
            type="submit"
          >
            Create
          </LoadingButton>
        </GlobalModal>
      </LocalizationProvider>
    </>
  );
};

export default DoctorScheduleModal;
