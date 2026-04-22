"use client";

import { EmployerRequest } from "@/types/employer";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

interface RequestTableProps {
  requests: EmployerRequest[];
  detailed?: boolean;
}

const RequestDetails = ({ requests }: RequestTableProps) => {
  const { id } = useParams();
 const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  // // 🔥 Replace with API later
  // const request = {
  //   title: "Senior Product Designer",
  //   id: "Req-2043-05",
  //   date: "2023-05-23",
  //   overview: [
  //     { label: "Submission Cap", value: 21 },
  //     { label: "Accepted Submissions", value: 12 },
  //     { label: "Target Shortlist", value: 5 },
  //   ],
  //   billing: [
  //     { label: "Admin Setup Fee", value: "₦800,000" },
  //     { label: "Prepaid Deposit", value: "₦980,000" },
  //     { label: "Final Charge", value: "₦1,980,000" },
  //   ],
  //   activity: [
  //     { label: "Request Published", active: true },
  //     { label: "Submissions Admitted", active: true },
  //     { label: "Evaluation Started", active: false },
  //     { label: "Shortlist", active: false },
  //   ],
  // };




  const handleCloseRequest = () => {
    console.log("Request closed");
    setShowModal(false);
      router.push("/requests");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push("/requests")}
          className="text-sm text-gray-500"
        >
          ← Back to all requests
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Close request
        </button>
      </div>

      {/* TITLE */}
      {requests.map((req) => (
        <div key={req.id} className="mb-6">
          <h1 className="text-2xl font-semibold">{req.title}</h1>
          <p className="text-gray-500 text-sm">
            ID: {req.id} • Date Created: {req.deadline}
          </p>
        </div>
      ))}
      

      {/* OVERVIEW */}
      <div className="bg-white rounded-xl p-5 shadow mb-6">
        <h2 className="font-semibold mb-4">Overview</h2>

        <div className="grid grid-cols-3 gap-4">
          {requests.map((item, index) => (
            <>
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <p className="text-xs text-gray-500">Submission Cap</p>
              <h3 className="text-lg font-semibold">{item.challenge_cap}</h3>
            </div>
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <p className="text-xs text-gray-500">Accepted Submissions</p>
              <h3 className="text-lg font-semibold">{item.challenge_cap}</h3>
            </div>
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <p className="text-xs text-gray-500">Shortlist size</p>
              <h3 className="text-lg font-semibold">{item.shortlist_size}</h3>
            </div>
            </>
          ))}
        </div>
      </div>

      {/* BILLING */}
      <div className="bg-white rounded-xl p-5 shadow mb-6">
        <h2 className="font-semibold mb-4">Billing</h2>

        <div className="grid grid-cols-3 gap-4">
          {requests.map((item, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <p className="text-xs text-gray-500">{item.title}</p>
              <h3 className="text-lg font-semibold text-red-500">
                {item.status}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVITY */}
      <div className="bg-white rounded-xl p-5 shadow">
        <h2 className="font-semibold mb-4">Activity</h2>

        <div className="flex justify-between items-center">
          {requests.map((step, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={`w-3 h-3 rounded-full mb-2 ${
                  step.shortlist_size ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              <p className="text-xs text-gray-600 text-center">
                Shortlist
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[350px] text-center">
            <div className="text-red-500 text-2xl mb-2">⚠️</div>

            <h3 className="font-semibold mb-2">
              Are you sure you want to close this request?
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              This action will delete the entire request from the database
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded-md w-full"
              >
                No, Cancel
              </button>

              <button
                onClick={handleCloseRequest}
                className="bg-red-500 text-white px-4 py-2 rounded-md w-full"
              >
                Yes, Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestDetails;