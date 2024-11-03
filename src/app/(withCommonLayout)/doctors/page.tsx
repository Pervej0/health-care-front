import DashedLine from "@/components/UI/DoctorPage/DashedLine";
import DoctorCard from "@/components/UI/DoctorPage/DoctorCard";
import { Doctor } from "@/types";
import { Box, Container } from "@mui/material";
import React from "react";

interface PropType {
  searchParams: { specialties: string };
}

const Doctors = async ({ searchParams }: PropType) => {
  let response;

  if (searchParams) {
    response = await fetch(
      `http://localhost:5000/api/v1/doctors?specialties=${searchParams.specialties}`
    );
  } else {
    response = await fetch(`http://localhost:5000/api/v1/doctors`);
  }

  const { data } = await response.json();

  return (
    <Container>
      <Box sx={{ my: 4, p: 3, bgcolor: "secondary.light" }}>
        {data?.map((doctor: Doctor, index: number) => (
          <Box key={doctor.id}>
            <DoctorCard doctor={doctor} />

            {index === data.length - 1 ? null : <DashedLine />}
          </Box>
        ))}

        {data.length === 0 && <Box>No Doctor Found With This Specialty</Box>}
      </Box>
    </Container>
  );
};

export default Doctors;
