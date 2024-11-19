import React from "react";
import { useGetMyAppointmentQuery } from "@/redux/api/patient/appointmentApi";

const PatientAppointmentsPage = () => {
  const { data, isLoading } = useGetMyAppointmentQuery({});
  console.log(data);

  return <div></div>;
};

export default PatientAppointmentsPage;
