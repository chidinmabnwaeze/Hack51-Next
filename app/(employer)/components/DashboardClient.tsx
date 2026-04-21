"use client";

import Link from "next/link";
import ChallengeButton from "./ChallengeButton";

interface DashboardProps {
  title: string;
  description: string;
}

interface Metrics {
  name: string;
  value: number;
  status: string;
  info: string;
}

export default function DashboardClient({
  title,
  description,
}: DashboardProps) {
  const metrics: Metrics[] = [
    {
      name: "Total Active Requests",
      value: 120,
      status: "Current",
      info: "12% more than last month",
    },
    {
      name: "Submissions Received",
      value: 45,
      status: "Growth",
      info: "2 more than last month",
    },
    {
      name: "In Evaluation",
      value: 30,
      status: "Action Needed",
      info: "Pending review",
    },
    {
      name: "Shortlisted Candidates",
      value: 5,
      status: "Success",
      info: "Completed Hiring Cycles",
    },
  ];

  return (
    <div>
      <section className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>

        <ChallengeButton />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-lg shadow border-t-3 border-[#FF0046]"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{metric.name}</h3>
              <div
                className={`px-3 py-1 rounded text-xs font-bold ${
                  metric.status === "Success"
                    ? "bg-green-100 text-green-800"
                    : metric.status === "Growth"
                      ? "bg-green-100 text-green-800"
                      : metric.status === "Action Needed"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                }`}
              >
                {metric.status}
              </div>
            </div>
            <p className="text-2xl font-bold">{metric.value}</p>
            <p
              className={`text-sm ${
                metric.status === "Current"
                  ? "text-green-500"
                  : metric.status === "Growth"
                    ? "text-green-500"
                    : metric.status === "Action Needed"
                      ? "text-red-500"
                      : "text-gray-500"
              }`}
            >
              {metric.info}
            </p>
          </div>
        ))}
      </section>

      <section className="bg-white p-4 shadow mt-8 rounded-2xl">
        <div className="flex justify-between items-center my-4 mb-6">
          <h2 className="text-xl font-bold">Active Requests</h2>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search requests..."
              className="border border-gray-100 p-2 rounded-lg shadow w-full mx-6"
            />
            <Link
              href="/requests"
              className="bg-[#FF0046] hover:bg-red-700 text-white font-bold py-2 px-6 whitespace-nowrap rounded"
            >
              View All
            </Link>
          </div>
        </div>
        <p className="text-gray-500 text-sm py-4">No active requests. <a href="/requests" className="text-[#FF0046] hover:underline">View all requests</a></p>
      </section>

      <section className="bg-white p-8 shadow mt-8 rounded-2xl">
        <h2 className="text-xl font-bold">Challenge Insights</h2>
        <p className="text-gray-600 mt-2">
          Your challenges are performing better than 78% of other companies in
          the Technology sector. Candidates appreciate the clarity of the Senior
          Product Designer challenge.
        </p>
        <div className="flex my-6 gap-6">
          <div className="shadow rounded-lg p-4 border border-gray-200">
            <h3 className="text-md font-semibold">Completion Rate</h3>
            <p className="text-2xl font-bold text-green-500">95%</p>
          </div>
          <div className="shadow rounded-lg p-4 border border-gray-200">
            <h3 className="text-md font-semibold">Average Score</h3>
            <p className="text-2xl font-bold text-green-500">7.8/10</p>
          </div>
        </div>
      </section>
    </div>
  );
}
