import { Box, Stack, Typography, styled } from "@mui/material";
import React from "react";

const StyledInformationBox = styled(Box)(({ theme }) => ({
  background: "#f4f7fe",
  borderRadius: theme.spacing(1),
  width: "45%",
  padding: "8px 16px",
  "& p": {
    fontWeight: 600,
  },
}));

const DoctorInformation = ({ doctorData }: any) => {
  console.log(doctorData, "pooo");
  return (
    <>
      <Typography variant="h5" color="primary.main" mb={2}>
        Personal Information
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} gap={3} flexWrap={"wrap"}>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Role
          </Typography>
          <Typography>{doctorData?.role}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Name
          </Typography>
          <Typography>{doctorData?.name}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Email
          </Typography>
          <Typography>{doctorData?.email}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Gender
          </Typography>
          <Typography>{doctorData?.gender}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Designation
          </Typography>
          <Typography>{doctorData?.designation}</Typography>
        </StyledInformationBox>
      </Stack>

      <Typography variant="h5" my={2} color={"primary.main"}>
        Professional Information
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} flexWrap={"wrap"} gap={3}>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Anointment Fee
          </Typography>
          <Typography>{doctorData?.appointmentFee}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Qualification
          </Typography>
          <Typography>{doctorData?.qualification}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Current Working Place
          </Typography>
          <Typography>{doctorData?.currentWorkingPlace}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Joined
          </Typography>
          <Typography>
            {doctorData
              ? new Date(doctorData.createdAt).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "2-digit",
                })
              : null}
          </Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Current Status
          </Typography>
          <Typography>{doctorData?.status}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Average Rating
          </Typography>
          <Typography>{doctorData?.averageRating}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            experience
          </Typography>
          <Typography>{doctorData?.experience}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          {doctorData?.doctorSpecialties?.map((item: any) => (
            <Typography key={item?.specialties?.id}>
              {item?.specialties?.title}
            </Typography>
          ))}
        </StyledInformationBox>
      </Stack>
    </>
  );
};

export default DoctorInformation;
