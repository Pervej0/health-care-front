"use client";

import { useGetMyAppointmentQuery } from "@/redux/api/patient/appointmentApi";
import { Box, IconButton } from "@mui/material";
import React from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import dateFormatter from "@/utils/dateFormatter";
import { getTimeIn12HourFormat } from "@/utils/getTimeIn12HourFormat";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import PhChips from "@/components/Shared/PhChips";
import Link from "next/link";

const DoctorAppointments = () => {
  const { data, isLoading } = useGetMyAppointmentQuery({}) as any;
  const appointments = data?.appointments?.data;

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Patient Name",
      flex: 1,
      renderCell: ({ row }) => {
        return row.patient.name;
      },
    },
    {
      field: "appointmentDate",
      headerName: "Appointment Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return dateFormatter(row.schedule.startDateTime);
      },
    },
    {
      field: "appointmentTime",
      headerName: "Appointment Time",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return getTimeIn12HourFormat(row.schedule.startDateTime);
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return row.paymentStatus === "PAID" ? (
          <PhChips label={row.paymentStatus} type="success" />
        ) : (
          <PhChips label={row.paymentStatus} type="error" />
        );
      },
    },
    {
      field: "action",
      headerName: "Join",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton
            component={Link}
            href={`/video?videoCallingId=${row?.videoCallingId}`}
            disabled={row.paymentStatus === "UNPAID"}
          >
            <VideocamIcon
              sx={{
                color: row.paymentStatus === "PAID" ? "primary.main" : "",
              }}
            />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box mt={8} sx={{ height: 400, width: "100%" }}>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={appointments} columns={columns} loading={isLoading} />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default DoctorAppointments;
