"use client";

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import DoctorScheduleModal from "./components/doctorScheduleModal";
import {
  useDeleteDoctorScheduleMutation,
  useGeMyScheduleQuery,
} from "@/redux/api/doctor/doctorScheduleApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { IResponse } from "@/types";
import dateFormatter from "@/utils/dateFormatter";

const DoctorSchedule = () => {
  const [open, setOpen] = useState<boolean>(false);
  const query: Record<string, any> = {};
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  query["page"] = page;
  query["limit"] = limit;
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const { data, isLoading } = useGeMyScheduleQuery({ ...query });
  const [deleteDoctorSchedule] = useDeleteDoctorScheduleMutation();

  console.log(data, "Heloooo");
  const handleDelete = async (id: string) => {
    try {
      const result = (await deleteDoctorSchedule(id)) as IResponse;
      if (result?.data.success) {
        toast.success(result.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const meta = data?.meta;

  let pageCount: number;

  if (meta?.total) {
    pageCount = Math.ceil(meta.total / limit);
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const updateData = data?.data?.map((schedule: any, index: number) => {
      return {
        id: schedule?.scheduleId,
        startDate: dateFormatter(schedule?.schedule?.startDateTime),
        startTime: dayjs(schedule.schedule?.startDateTime).format("hh:mm a"),
        endTime: dayjs(schedule?.schedule?.endDateTime).format("hh:mm a"),
      };
    });
    setAllSchedule(updateData);
  }, [data?.data]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "SN",
      width: 70,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: "startDate",
      headerName: "Date",
      width: 250,
    },
    {
      field: "startTime",
      headerName: "startTime",
      width: 230,
    },
    {
      field: "endTime",
      headerName: "End Time",
      width: 230,
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
      {isLoading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={allSchedule ?? []}
            columns={columns}
            hideFooterPagination
            // getRowId={() => crypto.randomUUID()}
            slots={{
              footer: () => {
                return (
                  <Box
                    sx={{
                      mb: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Pagination
                      color="primary"
                      count={pageCount}
                      page={page}
                      onChange={handleChange}
                    />
                  </Box>
                );
              },
            }}
          />
        </Box>
      )}
    </>
  );
};

export default DoctorSchedule;
