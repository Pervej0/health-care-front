"use client";

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CreateScheduleModal from "./components/CreateScheduleModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  useDeleteScheduleMutation,
  useGetAllScheduleQuery,
} from "@/redux/api/schedule/scheduleApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import dateFormatter from "@/utils/dateFormatter";
import timeFormatter from "@/utils/timeFormatter";
import { Toaster, toast } from "sonner";
import { IResponse } from "@/types";

const CreateSchedule = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetAllScheduleQuery({});
  const [deleteSchedule] = useDeleteScheduleMutation();

  const modifiedData = data?.data?.map((item: any) => {
    return {
      id: item.id,
      startDate: dateFormatter(item.startDateTime),
      endDate: dateFormatter(item.endDateTime),
      startTime: timeFormatter(item.startDateTime),
      endTime: timeFormatter(item.endDateTime),
    };
  });

  const handleDelete = async (id: string) => {
    try {
      const result = (await deleteSchedule(id)) as IResponse;
      if (result?.data.success) {
        toast.success(result.data.message);
      }
    } catch (err: any) {
      toast.error(err.data.message);
      console.log(err);
    }
  };

  const columns: GridColDef[] = [
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box>
            <IconButton
              onClick={() => handleDelete(row.id)}
              aria-label="delete"
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
            <Link href={`/dashboard/admin/doctors/edit/${row.id}`}>
              <IconButton aria-label="delete">
                <EditIcon />
              </IconButton>
            </Link>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Toaster position="top-center" />
      <Stack mt={10} justifyContent="space-between" direction="row" mb={6}>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Create Schedule
        </Button>
        <TextField size="small" placeholder="Search here" />
        <CreateScheduleModal open={open} setOpen={setOpen} />
      </Stack>
      {isLoading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid rows={modifiedData} columns={columns} />
        </Box>
      )}
    </>
  );
};

export default CreateSchedule;
