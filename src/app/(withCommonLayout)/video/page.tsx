import VideoCall from "@/components/UI/Appointment/VideoCall";
import { Container } from "@mui/material";
import React from "react";

type searchParamsType = {
  videoCallingId: string;
};

const VideoCalling = ({ searchParams }: { searchParams: searchParamsType }) => {
  console.log(searchParams.videoCallingId);
  return (
    <Container>
      <VideoCall videoCallingId={searchParams.videoCallingId} />
    </Container>
  );
};

export default VideoCalling;
