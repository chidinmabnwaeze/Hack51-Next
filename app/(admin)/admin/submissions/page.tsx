"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import SubmissionsList from "../components/SubmissionsList";
import { ActiveSubmissions } from "../components/SubmissionsList";

export default function SubmissionsPage() {
  const router = useRouter();

  const activeSubmissions: ActiveSubmissions[] = [
    {
      id: "REQ-2401-09",
      name: "Martha Ikemjika",
      role: "Product Designer (L3)",
      submissionId: "SUB-123RE-43",
      date: 12 - 2 - 2025,
      status: "pending evaluation",
    },
    {
      id: "REQ-2401-12",
      name: "Backend Engineer (Go/Rust)",
      role: "Backend Engineer (L4)",
      submissionId: "SUB-123RE-43",
      date: 2,
      status: "Evaluation in progress",
    },
    {
      id: "REQ-2401-15",
      name: "Marketing Lead (Growth)",
      role: "Marketing Lead (L4)",
      submissionId: "SUB-123RE-43",
      date: 0,
      status: "Shortlist ready",
    },
    {
      id: "REQ-2402-01",
      name: "Q2 Junior Frontend Intake",
      role: "Frontend Engineer (L1)",
      submissionId: "SUB-123RE-43",
      date: "-",
      status: "Draft",
    },
    {
      id: "REQ-2312-05",
      name: "Staff Data Scientist",
      role: "Data Scientist (L5)",
      submissionId: "SUB-123RE-43",
      date: "-",
      status: "Closed",
    },
  ];

  return (
    <div>
      <span
        onClick={() => router.push("/admin/review")}
        className="cursor-pointer hover:text-red-700 my-5 text-sm text-gray-500"
      >
        <ArrowLeftIcon className="inline-block mr-1" />
        Back to review
      </span>
      <section className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">Submissions</h1>
          <p className="text-gray-600 mb-6">
            Evaluate requests and shortlist candidates
          </p>
        </div>
      </section>
      <SubmissionsList submissions={activeSubmissions} detailed />
    </div>
  );
}
