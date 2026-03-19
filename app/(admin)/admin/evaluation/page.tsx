"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import EvaluationDetail from "../components/EvaluationDetail";
import { EvaluationDetailProps } from "../components/EvaluationDetail";

export default function SubmissionsPage({
  submissionId,
  candidateName,
  scenario,
  submissionStatement,
  deliverables,
  rubricItems,
  scores: initialScores,
  totalScore,
  adminNote,
  onBack,
  onSubmitToShortlist,
}: EvaluationDetailProps) {
  const router = useRouter();

  return (
    <div>
      <span
        onClick={() => router.push("/admin/submissions")}
        className="cursor-pointer hover:text-red-700 my-5 text-sm text-gray-500"
      >
        <ArrowLeftIcon className="inline-block mr-1" />
        Back to submissions
      </span>
      <section className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">Evaluation</h1>
          <p className="text-gray-600 mb-6">
            Evaluate requests and shortlist candidates
          </p>
        </div>
      </section>
      <EvaluationDetail
        submissionId={submissionId}
        candidateName={candidateName}
        scenario={scenario}
        submissionStatement={submissionStatement}
        deliverables={deliverables}
        rubricItems={rubricItems}
        scores={initialScores}
        totalScore={totalScore}
        adminNote={adminNote}
        onBack={onBack}
        onSubmitToShortlist={onSubmitToShortlist}
      />
    </div>
  );
}
