"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import EvaluationDetail from "@/app/(admin)/admin/components/EvaluationDetail";

// type SubmissionData = Omit<EvaluationDetailProps, "onBack" | "onSubmitToShortlist">;

// Mock data — replace with API fetch using submissionId when backend is ready
// const MOCK_SUBMISSIONS: Record<string, SubmissionData> = {
//   default: {
//     submissionId: "SUB-001",
//     candidateName: "Martha Ikemjika",
//     scenario:
//       "Define a 6-month roadmap for a high-growth fintech startup transitioning from local payments to cross-border remittances. Consider resource constraints, compliance, and market penetration strategies.",
//     submissionStatement:
//       "AI was used as a supplemental tool for brainstorming and technical formatting. The core analysis and final revisions remain my own original work.",
//     deliverables: [
//       { label: "RoadMap Document (PDF)", submitted: false },
//       { label: "Feature Prioritization Matrix", submitted: true },
//       { label: "Implementation Timeline", submitted: true },
//     ],
//     rubricItems: [
//       { name: "Code Quality",       weight: 30, description: "Code quality, design patterns and efficiency", judgeNote: "They should properly format the code." },
//       { name: "Code technicality",  weight: 30, description: "Code quality, design patterns and efficiency", judgeNote: "They should properly format the code." },
//       { name: "Code functionality", weight: 40, description: "Code quality, design patterns and efficiency", judgeNote: "They should properly format the code." },
//     ],
//     scores: { "Code Quality": 30, "Code technicality": 40, "Code functionality": 80 },
//     totalScore: 85,
//     adminNote:
//       "The candidate demonstrated strong technical proficiency and a clear understanding of the project requirements.",
//   },
// };

// interface Props {
//   params: { requestId: string; submissionId: string };
// }

export default function EvaluationPage() {
  const router = useRouter();
  // const { requestId, submissionId } = params;
    const params = useParams();
    const requestId = params.requestId as string;
     const submissionId = params.submissionId as string;

  return (
    <div>
      <span
        onClick={() => router.push(`/admin/review/${requestId}/submissions`)}
        className="cursor-pointer hover:text-red-700 my-5 text-sm text-gray-500"
      >
        <ArrowLeftIcon className="inline-block mr-1" />
        Back to submissions
      </span>
      <section className="flex justify-between mt-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Evaluation</h1>
          <p className="text-gray-600 text-sm mb-6">
            Evaluate requests and shortlist candidates
          </p>
        </div>
      </section>
      <EvaluationDetail
        // {...data}
        id ={ submissionId}
        // onBack={() => router.push(`/admin/review/${requestId}/submissions`)}
        // onSubmitToShortlist={() => router.push("/admin/shortlists")}
      />
    </div>
  );
}
