"use client";

import { reviewService } from "@/lib/services/review.service";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EmployerRequest } from "@/types/employer";
import { useEffect, useState } from "react";
import { Stats } from "@/types/submissions";

const badgeClasses = (status: string) => {
  const key = status.toLowerCase();
  switch (true) {
    case key.includes("published"):
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

export default function ReviewTable() {
  const headers = [
    "Request Title",
    "Submissions",
    "Deadline",
    "Status",
    "Actions",
  ];
  const router = useRouter();
  const [requests, setRequests] = useState<EmployerRequest[]>([]);
  // const [submissions, setSubmissions] = useState<Record<string, any[]>>({});
  const [submissionStats, setSubmissionStats] = useState<Record<string, Stats>>(
    {},
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await reviewService.getRequests({});
        console.log("FETCHED REQUESTS", response);

        const requestsData = Array.isArray(response)
          ? response
          : ((response as any).data ?? []);
        setRequests(requestsData);
      } catch (err: any) {
        console.log("ERROR FETCHING REQUESTS",err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    const fetchSubmissionStats = async () => {
      const results: Record<string, Stats> = {};

      await Promise.all(
        requests.map(async (req) => {
          const response = await reviewService.getAllRequestSubmissions(
            req.id,
            {},
          );
          results[req.id] = response.data.stats;
        }),
      );
      setSubmissionStats(results);
    };
    if (requests.length > 0) {
      fetchSubmissionStats();
    }
  }, [requests]);

  //calculate percentage
  const getPercentage = (submitted: number, total: number) => {
    if (!total) return 0;
    return (submitted / total) * 100;
  };

  const handleReviewClick = async (id: string) => {
    try {
      const res = await reviewService.getSubmissionsById(id);

      const submissionRecord = res.data;
      console.log(submissionRecord);
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
          {loading && (
            <tr>
              <td colSpan={5} className="py-8 text-center text-gray-500">
                Loading requests...
              </td>
            </tr>
          )}
          {!loading && requests.length === 0 && (
            <tr>
              <td colSpan={5} className="py-8 text-center text-gray-500">
                No requests found.
              </td>
            </tr>
          )}
          {requests.map((request, idx) => (
            <tr className="border-b border-gray-100 " key={idx}>
              <td className="py-4 px-4">
                <div className="flex flex-col">
                  <span className="font-semibold">{request.title}</span>
                  <>
                    {request.id && (
                      <small className="text-gray-500">ID: {request.id}</small>
                    )}
                  </>
                </div>
              </td>

              <td className="py-2 px-4">
                {submissionStats[request.id] ? (
                  <div className="mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#FF0046] h-2 rounded-full"
                        style={{
                          width: `${getPercentage(
                            submissionStats[request.id].submitted,
                            submissionStats[request.id].total,
                          )}%`,
                        }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {submissionStats[request.id].submitted}/
                      {submissionStats[request.id].total}
                    </p>
                  </div>
                ) : (
                  <span className="text-gray-400">Loading...</span>
                )}
              </td>

              <td className="py-2 px-4">{request.deadline ?? "-"}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${badgeClasses(request.status)}`}
                >
                  {request.status}
                </span>
              </td>
              <td className="py-2 px-4 flex items-center gap-2">
                <button
                  onClick={() => handleReviewClick(request.id)}
                  className=" flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 mr-2 border border-gray-200 px-3 py-1 rounded"
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
