"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import SubmissionsList, { ActiveSubmissions } from "@/app/(admin)/admin/components/SubmissionsList";
import { useEffect, useState } from "react";
import { requestService } from "@/lib/services/request.service";

// Mock data — replace with API fetch using requestId when backend is ready
const MOCK_SUBMISSIONS: Record<string, ActiveSubmissions[]> = {
  default: [
    { id: "REQ-2401-09", name: "Martha Ikemjika",              submissionId: "SUB-001", date: "2025-05-11", status: "pending evaluation" },
    { id: "REQ-2401-09", name: "David Manake",                 submissionId: "SUB-002", date: "2025-05-11", status: "Evaluation in progress" },
    { id: "REQ-2401-09", name: "Amara Osei",                   submissionId: "SUB-003", date: "2025-05-12", status: "pending evaluation" },
    { id: "REQ-2401-09", name: "Tunde Fashola",                submissionId: "SUB-004", date: "2025-05-12", status: "Shortlist ready" },
    { id: "REQ-2401-09", name: "Ngozi Adeyemi",                submissionId: "SUB-005", date: "2025-05-13", status: "pending evaluation" },
  ],
};

interface Props {
  params: { requestId: string };
}

export default function SubmissionsPage({ params }: Props) {
  const router = useRouter();
  const { requestId } = params;
  const [submissions, setSubmissions]= useState([])
  const [loading, setLoading] = useState(false);

  // TODO: Replace with real API fetch: const submissions = await fetchSubmissions(requestId)
  // const submissions = MOCK_SUBMISSIONS[requestId] ?? MOCK_SUBMISSIONS.default;

  useEffect(()=>{
    const fetchSubmissions = async () => {
      try{
        setLoading(true);
        const response = await requestService.getRequestById(requestId);
        console.log("SUBMISSIONS", response);
        setSubmissions(response.data);
        setLoading(false);
      }catch(error){
        console.error("Error fetching submissions:", error);
        setLoading(false);
      }
    }
    fetchSubmissions();
  },[])

  return (
    <div>
      {loading && <p>Loading submissions...</p>}
      <span
        onClick={() => router.push("/admin/review")}
        className="cursor-pointer hover:text-red-700 my-5 text-sm text-gray-500"
      >
        <ArrowLeftIcon className="inline-block mr-1" />
        Back to review
      </span>
      <section className="flex justify-between mt-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Submissions</h1>
          <p className="text-gray-500 text-sm mb-6">
            Request ID: {requestId}
          </p>
        </div>
      </section>
      <SubmissionsList submissions={submissions} requestId={requestId} detailed />
    </div>
  );
}
