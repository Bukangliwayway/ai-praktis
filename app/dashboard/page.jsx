import { UserButton } from "@clerk/nextjs";
import React from "react";
import StartInterview from "./_components/StartInterview";

const Dashboard = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Start chuchu</h2>
      <h2 className="text-gray-500">Create and start a quiz</h2>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <StartInterview />
      </div>
    </div>
  );
};

export default Dashboard;
