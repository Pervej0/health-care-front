"use client";

import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useGetAllSpecialtyQuery } from "@/redux/api/admin/specialties/specialtiesApi";

const ScrollCategory = ({ specialties }: { specialties: string }) => {
  const { data } = useGetAllSpecialtyQuery(undefined);
  const [value, setValue] = React.useState(specialties || "");
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue === "all") {
      router.push("/doctors");
    } else {
      router.push(`/doctors?specialties=${newValue}`);
    }
  };

  return (
    <Box sx={{ maxWidth: "100%", bgcolor: "background.paper", mx: "auto" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="All" value="all" sx={{ fontWeight: 600 }} />
        {data?.data?.map((specialty: any) => (
          <Tab
            key={specialty.id}
            label={specialty.title}
            value={specialty.title}
            sx={{ fontWeight: 600 }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default ScrollCategory;
