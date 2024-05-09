"use client";

import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import SpecialtiesModal from "./components/SpecialtiesModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const SpecialtiesPage = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 230 },
    { field: "lastName", headerName: "Last name", width: 230 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 360,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  ];

  return (
    <>
      <Stack mt={10} justifyContent="space-between" direction="row" mb={6}>
        <Button variant="outlined" onClick={handleClickOpen}>
          Create Specialties
        </Button>
        <TextField size="small" placeholder="Search here" />
        <SpecialtiesModal open={open} setOpen={setOpen} />
      </Stack>
      {/* Table */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </>
  );
};

export default SpecialtiesPage;
