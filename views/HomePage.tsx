import React from "react";
import Hero from "@/components/shared/Hero";
import ServiceCard from "@/components/ui/ServiceCard";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div id="services">
        <ServiceCard />
      </div>
    </div>
  );
};

export default HomePage;
