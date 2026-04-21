"use client";

import { reviewService } from "@/lib/services/review.service";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface Submission {
  submitted: number;
  total: number;
  percentage: number;
}

export interface ActiveRequest {
  id?: string;
  role?: string;
  title: string;
  submissions: Submission[];
  days_left?: number | string;
  status: string;
}

interface RequestTableProps {
  requests: ActiveRequest[];
  detailed?: boolean;
}

const badgeClasses = (status: string) => {
  const key = status.toLowerCase();
  switch (true) {
    case key.includes("open"):
      return "bg-blue-100 text-blue-800";
    case key.includes("evaluation"):
    case key.includes("in progress"):
      return "bg-yellow-100 text-yellow-800";
    case key.includes("shortlist"):
      return "bg-green-100 text-green-800";
    case key.includes("draft"):
      return "bg-gray-100 text-gray-800";
    case key.includes("closed"):
      return "bg-gray-200 text-gray-500";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function ReviewTable({
  requests,
  detailed = false,
}: RequestTableProps) {
  const headers = [
    "Request Title",
    "Submissions",
    "Days Left",
    "Status",
    "Actions",
  ];

  const router = useRouter();

  const handleReviewClick = async (id?: string) => {
    try {
      const res = await reviewService.getSubmissionsById(id!);
      if (res) {
        router.push(`/admin/review/${id}/submissions`);
      } else {
        alert("Request not found");
      }
    } catch (err: any) {
      console.error("ERROR FETCHING SUBMISSIONS", err.message);
    }
  };

  return (
    <div className="overflow-x-auto">
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
          {requests.map((request, idx) => (
            <tr className="border-b border-gray-100" key={idx}>
              <td className="py-2 px-4">
                <div className="flex flex-col">
                  <span className="font-semibold">{request.title}</span>
                  {detailed && (
                    <>
                      {request.id && (
                        <small className="text-gray-500">
                          ID: {request.id}
                        </small>
                      )}
                      {request.role && (
                        <small className="text-gray-500">{request.role}</small>
                      )}
                    </>
                  )}
                </div>
              </td>

              <td className="py-2 px-4">
                {request.submissions.map((s, si) => (
                  <div key={si} className="mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#FF0046] h-2 rounded-full"
                        style={{ width: `${s.percentage}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {s.submitted}/{s.total}
                    </p>
                  </div>
                ))}
              </td>

              <td className="py-2 px-4">{request.days_left ?? "-"}</td>
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
                    router.push(`/admin/review/${request.id}/submissions`);
                  }}
                  className=" flex gap-2 text-gray-500 hover:text-gray-700 mr-2 border border-gray-200 px-3 py-1 rounded"
                >
                  <Eye />
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
