"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import SubmissionsList from "@/app/(admin)/admin/components/SubmissionsList";
import { useEffect, useState } from "react";
import {reviewService } from "@/lib/services/review.service";
import { SubmissionListProps } from "@/types/submissions";

export default function SubmissionsPage() {
  const router = useRouter();
  const params = useParams();
  const requestId = params.requestId as string;
  const [submissions, setSubmissions] = useState<SubmissionListProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await reviewService.getAllRequestSubmissions(
          requestId,
          { status: ["pending", "evaluating", "shortlisted"] },
        );
        console.log("SUBMISSIONS", response);
        setSubmissions(response.data.submissions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  return (
    <div>
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
          <p className="text-gray-500 text-sm mb-6">Request ID: {requestId}</p>
        </div>
      </section>
      {loading && <p>Loading submissions...</p>}
      <SubmissionsList
        submissions={submissions}
        requestId={requestId}
        detailed
      />
    </div>
  );
}
