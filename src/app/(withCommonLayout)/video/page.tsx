import { Search } from "@mui/icons-material";
import { Container } from "@mui/material";
import React from "react";

type searchParamsType = {
  videoCallingId: string;
};

const VideoCalling = ({ searchParams }: { searchParams: searchParamsType }) => {
  console.log(searchParams.videoCallingId);
  return (
    <Container>
      <h2>Start</h2>
    </Container>
  );
};

export default VideoCalling;
