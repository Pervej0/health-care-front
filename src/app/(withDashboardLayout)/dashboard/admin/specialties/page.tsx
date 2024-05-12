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
import SpecialtiesModal from "./components/SpecialtiesModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  useDeleteSpecialtyMutation,
  useGetAllSpecialtyQuery,
} from "@/redux/api/specialties/specialtiesApi";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { IResponse } from "@/types";

const SpecialtiesPage = () => {
  const { data, isLoading } = useGetAllSpecialtyQuery({});
  const [open, setOpen] = useState(false);
  const specialty = useDeleteSpecialtyMutation();
  const [deleteSpecialty] = useDeleteSpecialtyMutation();

  console.log(data, isLoading, "xxxxx");

  const handleDelete = async (id: string) => {
    try {
      const result = (await deleteSpecialty(id)) as IResponse;
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
    { field: "title", headerName: "Title", width: 230 },
    {
      field: "icon",
      headerName: "Icon",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Box
          sx={{ display: "flex" }}
          alignItems="center"
          justifyContent="center"
        >
          <Image src={row.icon} alt="icon image" height={30} width={30} />
        </Box>
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
          <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  // const rows = [
  //   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  // ];
  return (
    <>
      <Toaster position="top-center" />
      <Stack mt={10} justifyContent="space-between" direction="row" mb={6}>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Create Specialties
        </Button>
        <TextField size="small" placeholder="Search here" />
        <SpecialtiesModal open={open} setOpen={setOpen} />
      </Stack>
      {/* Table */}
      {isLoading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid rows={data?.data} columns={columns} hideFooter={true} />
        </Box>
      )}
    </>
  );
};

export default SpecialtiesPage;
