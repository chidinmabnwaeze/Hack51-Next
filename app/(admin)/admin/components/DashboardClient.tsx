"use client";
import { FileSpreadsheet } from "lucide-react";
import Image from "next/image";

export default function DashboardClient() {
  const metrics = [
    {
      name: "Total Users",
      value: "1,234",
      icon: FileSpreadsheet,
      info: "12% more than last month",
    },
    {
      name: "Invalid Submissions",
      value: 45,
      icon: FileSpreadsheet,
      info: "2 more than last month",
    },
    {
      name: "Evaluated Submissions",
      value: 30,
      icon: FileSpreadsheet,
      info: "Pending review",
    },
    {
      name: "Shortlisted Candidates",
      value: 5,
     icon: FileSpreadsheet,
      info: "Completed Hiring Cycles",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index)=>(

        <div className="bg-white p-6 rounded-lg shadow border-t-4 border-[#FF0046]" key={index}>
          {/* <Image src ={metric.icon} className="text-[#FF0046] mb-3" alt="icon" /> */}
          <metric.icon className="text-[#FF0046] mb-3"/>
          <h3 className="text-gray-600 text-sm font-medium mb-2">
            {metric.name}
          </h3>
          <p className="text-3xl font-bold">1,234</p>
          <p className="text-xs text-green-400">
            12% more than the last 90 days
          </p>
        </div>
        ))}
      
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <p className="text-gray-600">
          Platform analytics and monitoring coming soon...
        </p>
      </div>
    </div>
  );
}
