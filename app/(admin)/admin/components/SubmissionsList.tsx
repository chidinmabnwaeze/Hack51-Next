"use client";

import { ArrowLeft, ArrowRight, Eye, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// export interface Submission {
//   submitted: number;
//   total: number;
//   percentage: number;
// }

export interface ActiveSubmissions {
  id?: string;
  role?: string;
  name: string;
  submissionId: string;
  date?: number | string;
  status: string;
}

interface SubmissionsTableProps {
  submissions: ActiveSubmissions[];
  requestId: string;
  detailed?: boolean;
}

const badgeClasses = (status: string) => {
  const key = status.toLowerCase();
  switch (true) {
    case key.includes("open"):
      return "bg-blue-100 text-blue-800";
    case key.includes("evaluation"):
    case key.includes("pending evaluation"):
      return "bg-yellow-100 text-yellow-800";
    case key.includes("In Evaluation"):
      return "bg-green-100 text-green-800";
    case key.includes("draft"):
      return "bg-gray-100 text-gray-800";
    case key.includes("submission rejected"):
      return "bg-gray-200 text-gray-500";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function SubmissionsList({
  submissions,
  requestId,
  detailed = false,
}: SubmissionsTableProps) {
  const headers = [
    "Candidate name",
    "Submission ID",
    "Date",
    "Status",
    "Action",
  ];

  const router = useRouter();
  const 
  return (
    <div className="overflow-x-auto shadow rounded-lg p-4 bg-white">
      <section className="flex gap-6 bg-white border-b pb-4 border-b-gray-200">
        <div className="flex items-center gap-2">
          <UserCircle2 className="text-[#FF0046]" />
          <div>
            <h1 className="font-bold">Magrib Constructions</h1>
            <p className="text-sm text-gray-500">magrib@gmail.com</p>
          </div>
        </div>
        <div>
          <h1 className="font-bold">Senior Product Designer</h1>
          <p className="text-sm text-gray-500">ID: REQ-2401-09</p>
        </div>
      </section>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-50">
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-2 px-4 border-b border-gray-100 text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {submissions.map((request, idx) => (
            <tr className="border-b border-gray-100" key={idx}>
              <td className="py-2 px-4">
                <div className="flex flex-col">
                  <span className="font-semibold">{request.name}</span>
                  {detailed && (
                    <>
                      {/* {request.id && (
                        <small className="text-gray-500">
                          ID: {request.id}
                        </small>
                      )} */}
                      {request.role && (
                        <small className="text-gray-500">{request.role}</small>
                      )}
                    </>
                  )}
                </div>
              </td>

              <td className="py-2 px-4">{request.submissionId}</td>

              <td className="py-2 px-4">{request.date ?? "-"}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${badgeClasses(request.status)}`}
                >
                  {request.status}
                </span>
              </td>
              <td className="py-2 px-4 flex gap-2">
                <button
                  onClick={() => {
                    router.push(`/admin/review/${requestId}/submissions/${request.submissionId}`);
                  }}
                  className=" flex gap-2 text-gray-500 hover:text-gray-700 mr-2 border border-gray-200 px-3 py-1 rounded"
                >
                  Evaluate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
          <section className="flex justify-between items-center">
            <div className="flex text-gray-500 text-sm">
              <ArrowLeft />
              <h5>Prev</h5>
            </div>
            <div className=" text-gray-500 text-sm">
              {submissions.map((_, idx) => idx + 1)}
            </div>
            <div className="flex text-[#FF0046] text-sm">
              <ArrowRight />
              <h5>Next</h5>
            </div>
          </section>
      </table>
    </div>
  );
}
