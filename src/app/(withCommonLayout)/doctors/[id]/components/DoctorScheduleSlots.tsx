"use client";

import { useGetAllDoctorScheduleQuery } from "@/redux/api/doctor/doctorScheduleApi";
import { useCreateAppointmentMutation } from "@/redux/api/patient/appointmentApi";
import { useInitialPaymentMutation } from "@/redux/api/patient/paymentApi";
import { DoctorSchedule } from "@/types";
import dateFormatter from "@/utils/dateFormatter";
import { getTimeIn12HourFormat } from "@/utils/getTimeIn12HourFormat";
import { Box, Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";

const DoctorScheduleSlots = ({ id }: { id: string }) => {
  const [scheduleId, setScheduleId] = useState("");
  const router = useRouter();
  const query: Record<string, any> = {};
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

  const currentDate = new Date();
  const { data, isLoading } = useGetAllDoctorScheduleQuery({ ...query });
  const doctorSchedules = data?.data;
  const today = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  const availableSlots = doctorSchedules?.filter(
    (doctor: DoctorSchedule) => !doctor.isBooked
  );

  // next day schedule slots
  const nextAvailableDate = new Date();
  nextAvailableDate.setDate(currentDate.getDate() + 1);
  const tomorrow = nextAvailableDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  query.startDateTime = dayjs(nextAvailableDate)
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .toISOString();

  query.endDateTime = dayjs(nextAvailableDate)
    .hour(23)
    .minute(59)
    .second(59)
    .millisecond(999)
    .toISOString();

  const { data: nextDoctorSchedules, isLoading: loading } =
    useGetAllDoctorScheduleQuery({
      ...query,
    });

  const availableNextDaySlots = nextDoctorSchedules?.data.filter(
    (doctor: DoctorSchedule) => !doctor.isBooked
  );

  // handle book appointment
  const [createAppointment] = useCreateAppointmentMutation();
  const [initialPayment] = useInitialPaymentMutation();

  const handleBookAppointment = async () => {
    try {
      if (id && scheduleId) {
        const res = await createAppointment({
          doctorId: id,
          scheduleId,
        }).unwrap();
        if (res.data.id) {
          const response = await initialPayment(res.data.id).unwrap();
          if (response.data.GatewayPageURL) {
            router.push(response?.data?.GatewayPageURL);
          }
        }
        toast.success("Appointment booked successfully");
      }
    } catch (error) {
      toast.error("Failed to book appointment");
      console.log(error);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Box mb={5}>
        <Box sx={{ bgcolor: "white", p: 3, mt: 1 }}>
          <Typography variant="h4" mb={3} color="primary.main">
            Availability
          </Typography>
          <Typography variant="h6" fontSize={16}>
            <b>
              Today: {dateFormatter(currentDate.toISOString()) + " " + today}
            </b>
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
          <Typography variant="h6" fontSize={16} mt={5}>
            <b>
              Tomorrow:{" "}
              {dateFormatter(nextAvailableDate.toISOString()) + " " + tomorrow}
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
                    doctorSchedule?.schedule?.startDateTime
                  )} - ${getTimeIn12HourFormat(
                    doctorSchedule?.schedule?.endDateTime
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
        </Box>
        <Button
          onClick={handleBookAppointment}
          sx={{ display: "block", mx: "auto" }}
        >
          Book Appointment Now
        </Button>
      </Box>
    </>
  );
};

export default DoctorScheduleSlots;
