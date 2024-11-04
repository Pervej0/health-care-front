"use client";

import { useGetAllDoctorScheduleQuery } from "@/redux/api/doctor/doctorScheduleApi";
import { DoctorSchedule } from "@/types";
import dateFormatter from "@/utils/dateFormatter";
import { getTimeIn12HourFormat } from "@/utils/getTimeIn12HourFormat";
import { Box, Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DoctorScheduleSlots = ({ id }: { id: string }) => {
  const [scheduleId, setScheduleId] = useState("");
  const query: Record<string, any> = {};
  const router = useRouter();
  query["doctorId"] = id;

  query["startDateTime"] = dayjs(new Date())
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .toISOString();

  query["endDateTime"] = dayjs(new Date())
    .hour(23)
    .minute(59)
    .second(59)
    .millisecond(999)
    .toISOString();

  const { data, isLoading } = useGetAllDoctorScheduleQuery({ ...query });
  const doctorSchedules = data?.data;
  console.log(doctorSchedules);
  const availableSlots = doctorSchedules?.filter(
    (doctor: DoctorSchedule) => !doctor.isBooked
  );
  const currentDate = new Date();
  const today = currentDate.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <Box mb={5}>
      <Box sx={{ bgcolor: "white", p: 3, mt: 1 }}>
        <Typography variant="h4" mb={3} color="primary.main">
          Availability
        </Typography>
        <Typography variant="h6" fontSize={16}>
          <b>Today: {dateFormatter(currentDate.toISOString()) + " " + today}</b>
        </Typography>
        <Box sx={{ borderBottom: "2px dashed #d0d0d0", mt: 2, mb: 3 }} />
        <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
          {availableSlots?.length ? (
            isLoading ? (
              "Loading..."
            ) : (
              availableSlots?.map((doctorSchedule: DoctorSchedule) => {
                const formattedTimeSlot = `${getTimeIn12HourFormat(
                  doctorSchedule?.schedule?.startDateTime
                )} - ${getTimeIn12HourFormat(
                  doctorSchedule?.schedule?.startDateTime
                )}`;

                return (
                  <Button
                    key={doctorSchedule?.scheduleId}
                    color="primary"
                    onClick={() => setScheduleId(doctorSchedule?.scheduleId)}
                    variant={`${
                      doctorSchedule?.scheduleId === scheduleId
                        ? "contained"
                        : "outlined"
                    }`}
                  >
                    {formattedTimeSlot}
                  </Button>
                );
              })
            )
          ) : (
            <span style={{ color: "red" }}>
              No Schedule is Available Today!
            </span>
          )}
        </Stack>
        {/* <Typography variant="h6" fontSize={16} mt={5}>
          <b>
            Tomorrow: {dateFormatter(nextDate.toISOString()) + " " + tomorrow}
          </b>
        </Typography>
        <Box sx={{ borderBottom: "2px dashed #d0d0d0", mt: 2, mb: 3 }} />
        <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
          {availableNextDaySlots?.length ? (
            isLoading ? (
              "Loading..."
            ) : (
              availableNextDaySlots?.map((doctorSchedule: DoctorSchedule) => {
                const formattedTimeSlot = `${getTimeIn12HourFormat(
                  doctorSchedule?.schedule?.startDate
                )} - ${getTimeIn12HourFormat(
                  doctorSchedule?.schedule?.endDate
                )}`;

                return (
                  <Button
                    key={doctorSchedule?.scheduleId}
                    color="primary"
                    onClick={() => setScheduleId(doctorSchedule?.scheduleId)}
                    variant={`${
                      doctorSchedule?.scheduleId === scheduleId
                        ? "contained"
                        : "outlined"
                    }`}
                  >
                    {formattedTimeSlot}
                  </Button>
                );
              })
            )
          ) : (
            <span style={{ color: "red" }}>
              No Schedule is Available Today!
            </span>
          )}
        </Stack> */}
      </Box>

      <Button
        // onClick={handleBookAppointment}
        sx={{ display: "block", mx: "auto" }}
      >
        Book Appointment Now
      </Button>
    </Box>
  );
};

export default DoctorScheduleSlots;
