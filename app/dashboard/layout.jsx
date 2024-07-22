import Header from "@/components/Header";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
    </div>
  );
};

export default DashboardLayout;
