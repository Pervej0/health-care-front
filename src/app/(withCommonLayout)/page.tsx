import HeroSection from "@/components/UI/HomePage/HeroSection";
import HowItWorks from "@/components/UI/HomePage/HowItWorks";
import Stats from "@/components/UI/HomePage/Stats";
import TopRatedDoctors from "@/components/UI/HomePage/TopRatedDoctors";
import WhyUs from "@/components/UI/HomePage/WhyUs";
import Specialties from "@/components/UI/HomePage/specialties";
import React from "react";

const page = () => {
  return (
    <>
      <HeroSection />
      <Specialties />
      <TopRatedDoctors />
      <WhyUs />
      <HowItWorks />
      <Stats />
    </>
  );
};

export default page;
