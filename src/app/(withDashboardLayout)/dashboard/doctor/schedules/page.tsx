"use client";

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import DoctorScheduleModal from "./components/doctorScheduleModal";
import {
  useDeleteDoctorScheduleMutation,
  useGetSingleDoctorScheduleQuery,
} from "@/redux/api/doctor/doctorScheduleApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { IResponse } from "@/types";

const DoctorSchedule = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetSingleDoctorScheduleQuery({});
  const [deleteDoctorSchedule] = useDeleteDoctorScheduleMutation();

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      const result = (await deleteDoctorSchedule(id)) as IResponse;
      if (result?.data.success) {
        toast.success(result.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: "start",
      headerName: "Schedule",
      width: 230,
      renderCell: ({ row }) => (
        <Typography>
          {dayjs(row?.schedule.startDateTime).format("hh:mm a")} -{" "}
          {dayjs(row?.schedule.endDateTime).format("hh:mm a")}
        </Typography>
      ),
    },
    {
      field: "",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Box
          sx={{ display: "flex" }}
          alignItems="center"
          justifyContent="center"
        >
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(row.scheduleId)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

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
      {/* Table */}
      {isLoading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data?.data}
            columns={columns}
            hideFooter={true}
            getRowId={() => crypto.randomUUID()}
          />
        </Box>
      )}
    </>
  );
};

export default DoctorSchedule;
