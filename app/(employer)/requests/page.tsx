"use client";
import RequestTable from "../components/RequestTable";
import type { ActiveRequest } from "../components/RequestTable";
import ChallengeButton from "../components/ChallengeButton";
import { requestService } from "@/lib/services/request.service";
import { useEffect, useState } from "react";

// const activeRequests: ActiveRequest[] = [
//   {
//     id: "REQ-2401-09",
//     title: "Senior Product Designer",
//     role: "Product Designer (L3)",
//     submissions: [{ submitted: 13, total: 21, percentage: 62 }],
//     days_left: 12,
//     status: "Open for submissions",
//   },
//   {
//     id: "REQ-2401-12",
//     title: "Backend Engineer (Go/Rust)",
//     role: "Backend Engineer (L4)",
//     submissions: [{ submitted: 21, total: 21, percentage: 100 }],
//     days_left: 2,
//     status: "Evaluation in progress",
//   },
//   {
//     id: "REQ-2401-15",
//     title: "Marketing Lead (Growth)",
//     role: "Marketing Lead (L4)",
//     submissions: [{ submitted: 50, total: 50, percentage: 100 }],
//     days_left: 0,
//     status: "Shortlist ready",
//   },
//   {
//     id: "REQ-2402-01",
//     title: "Q2 Junior Frontend Intake",
//     role: "Frontend Engineer (L1)",
//     submissions: [{ submitted: 0, total: 30, percentage: 0 }],
//     days_left: "-",
//     status: "Draft",
//   },
//   {
//     id: "REQ-2312-05",
//     title: "Staff Data Scientist",
//     role: "Data Scientist (L5)",
//     submissions: [{ submitted: 15, total: 15, percentage: 100 }],
//     days_left: "-",
//     status: "Closed",
//   },
// ];

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);

  const [activeTab, setActiveTab]= useState<"all"| "closed" | "drafts">('all')

  const all = activeTab === "all";

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await requestService.getRequests({
          title: "",
          page: 1,
          limit: 10,
          id: 0,
          level: "",
          competencies: [],
          scope_description: "",
          status: "shortlisted",
        });
        console.log("request_data", data);
        return data;
      } catch (error) {
        console.log("Error fetching requests", error);
        throw new Error("Failed to fetch requests");
      }
    };
    fetchRequests();
  }, []);

  return (
    <div>
      <section className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">All Requests</h1>
          <p className="text-gray-600 mt-2">
            Manage the lifecycle of your hiring challenges across all statuses.
          </p>
        </div>
        <ChallengeButton />
      </section>

      {/* tabs */}
      <section className="mt-6 border-b border-gray-200">
        <div>
          <button className="px-4 py-2 border-b-2 border-[#FF0046] text-[#FF0046] font-medium" onClick={()=> setActiveTab(all)}>
            Active Requests
          </button>
          <button className="px-4 py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
            Drafts
          </button>
          <button className="px-4 py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
            Closed
          </button>
        </div>
      </section>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <input
          type="text"
          placeholder="Search requests by title or ID..."
          className="border border-gray-100 p-2 rounded-lg shadow w-full md:w-1/2"
        />
        <div className="flex gap-2">
          <button className="border border-gray-200 px-4 py-2 rounded hover:bg-gray-50">
            Filter Status
          </button>
          <button className="border border-gray-200 px-4 py-2 rounded hover:bg-gray-50">
            Sort
          </button>
        </div>
      </div>

      <section className="mt-6 shadow bg-white p-6 rounded-2xl">
        <RequestTable requests={[]} detailed />
      </section>

      <div className="flex justify-end items-center mt-4 gap-2">
        <button className="px-4 py-2 border border-[#FF0046] rounded text-[#FF0046] hover:bg-gray-50">
          PREV
        </button>
        <button className="px-4 py-2 border border-[#FF0046] rounded text-[#FF0046] hover:bg-gray-50">
          NEXT
        </button>
      </div>
    </div>
  );
}
