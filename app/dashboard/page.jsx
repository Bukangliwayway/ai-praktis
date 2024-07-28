"use client";
import React from "react";
import StartInterview from "./_components/StartInterview";

const Dashboard = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Start chuchu</h2>
      <h2 className="text-gray-500">Create and start a quiz</h2>
      <StartInterview />
    </div>
  );
};

export default Dashboard;
