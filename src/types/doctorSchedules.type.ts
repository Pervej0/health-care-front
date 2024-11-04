import { Doctor } from "./doctor.type";

export interface DoctorSchedule {
  doctorId: string;
  scheduleId: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
  appointmentId: string | null;
  doctor: Doctor;
  schedule: Schedule;
}

export interface Schedule {
  id: string;
  startDateTime: string;
  endDateTime: string;
  createdAt: string;
  updatedAt: string;
}
