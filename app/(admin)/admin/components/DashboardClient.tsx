"use client";
import { FileSpreadsheet } from "lucide-react";
import Image from "next/image";
import EvaluationBarChart from "./EvaluationBarChart";
import RequestPieChart from "./RequestPieChart";
import RequestTable from "@/components/RequestTable";
import { ActiveRequest } from "@/components/RequestTable";
import CustomActiveShapePieChart from "./RequestPieChart";

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

  const activeRequests: ActiveRequest[] = [
    {
      id: "REQ-2401-09",
      title: "Senior Product Designer",
      role: "Product Designer (L3)",
      submissions: [{ submitted: 13, total: 21, percentage: 62 }],
      days_left: 12,
      status: "Open for submissions",
    },
    {
      id: "REQ-2401-12",
      title: "Backend Engineer (Go/Rust)",
      role: "Backend Engineer (L4)",
      submissions: [{ submitted: 21, total: 21, percentage: 100 }],
      days_left: 2,
      status: "Evaluation in progress",
    },
    {
      id: "REQ-2401-15",
      title: "Marketing Lead (Growth)",
      role: "Marketing Lead (L4)",
      submissions: [{ submitted: 50, total: 50, percentage: 100 }],
      days_left: 0,
      status: "Shortlist ready",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div
            className="bg-white p-6 rounded-lg shadow border-t-4 border-[#FF0046]"
            key={index}
          >
            {/* <Image src ={metric.icon} className="text-[#FF0046] mb-3" alt="icon" /> */}
            <metric.icon className="text-[#FF0046] mb-3" />
            <h3 className="text-gray-600 text-sm font-medium mb-2">
              {metric.name}
            </h3>
            <p className="text-3xl font-bold">{metric.value}</p>
            <p className="text-xs text-green-400">{metric.info}</p>
          </div>
        ))}
      </div>

      <section className="flex justify-between items-center">
        <div className="shadow bg-white rounded-lg p-3 w-1/2 mr-10 ">
          <div className="flex gap-2 border-b my-2 border-b-gray-200">
            <FileSpreadsheet className="text-[#FF0046]" />
            <h1 className="font-bold">Reviewers evaluation per day </h1>
          </div>
          <EvaluationBarChart />
        </div>
        <div className="shadow bg-white rounded-lg p-3 w-1/2 ml-10 ">
          <div className="flex gap-2 border-b my-2 border-b-gray-200">
            <FileSpreadsheet className="text-[#FF0046]" />
            <h1 className="font-bold">Reviewers evaluation per day </h1>
          </div>
         <EvaluationBarChart/>
        </div>
      </section>

      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-bold mb-4">Recent Requests</h2>

        <RequestTable requests={activeRequests} detailed />
      </div>
    </div>
  );
}
