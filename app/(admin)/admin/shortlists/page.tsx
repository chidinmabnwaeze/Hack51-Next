"use client";

import { useState } from "react";
import EvaluationDetail from "../components/EvaluationDetail";
import ShortlistsTable, { ShortlistRow} from "../components/ShortlistsTable"
import ShortlistCandidates, { CandidateRow } from "../components/ShortlistCandidates";
import { useRouter } from "next/navigation";

// ─── Mock data (replace with real API calls) ─────────────────────────────────

const MOCK_SHORTLISTS: ShortlistRow[] = [
  {
    id: "req-1",
    requestTitle: "Senior Product Designer",
    requestId: "REQ-234-06",
    shortlistSize: 5,
    status: "in_review",
  },
  {
    id: "req-2",
    requestTitle: "Product Manager",
    requestId: "REQ-234-06",
    shortlistSize: 5,
    status: "delivered",
  },
];

 export const MOCK_CANDIDATES: CandidateRow[] = [
  { id: "c1", submissionId: "SUB-123RE-43", candidateName: "David Manake",   dateEvaluated: "2023-05-11", score: 87 },
  { id: "c2", submissionId: "SUB-123RE-43", candidateName: "Martha Ikemjika",dateEvaluated: "2023-05-11", score: 60 },
  { id: "c3", submissionId: "SUB-123RE-43", candidateName: "David Manake",   dateEvaluated: "2023-05-11", score: 90 },
  { id: "c4", submissionId: "SUB-123RE-43", candidateName: "Martha Ikemjika",dateEvaluated: "2023-05-11", score: 54 },
  { id: "c5", submissionId: "SUB-123RE-43", candidateName: "Martha Ikemjika",dateEvaluated: "2023-05-11", score: 34 },
  { id: "c6", submissionId: "SUB-123RE-43", candidateName: "David Manake",   dateEvaluated: "2023-05-11", score: 87 },
  { id: "c7", submissionId: "SUB-123RE-43", candidateName: "Martha Ikemjika",dateEvaluated: "2023-05-11", score: 34 },
  { id: "c8", submissionId: "SUB-123RE-43", candidateName: "David Manake",   dateEvaluated: "2023-05-11", score: 15 },
  { id: "c9", submissionId: "SUB-123RE-43", candidateName: "David Manake",   dateEvaluated: "2023-05-11", score: 87 },
  { id: "c10",submissionId: "SUB-123RE-43", candidateName: "Martha Ikemjika",dateEvaluated: "2023-05-11", score: 18 },
];

export const MOCK_EVALUATION = {
  submissionId: "SUB-123RE-43",
  candidateName: "Martha Ikemjika",
  scenario:
    "Define a 6-month roadmap for a high-growth fintech startup transitioning from local payments to cross-border remittances. Consider resource constraints, compliance, and market penetration strategies.",
  submissionStatement:
    "AI was used as a supplemental tool for brainstorming and technical formatting. The core analysis and final revisions remain my own original work.",
  deliverables: [
    { label: "RoadMap Document (PDF)", submitted: false },
    { label: "Feature Prioritization Matrix", submitted: true },
    { label: "Implementation Timeline", submitted: true },
  ],
  rubricItems: [
    { name: "Code Quality",      weight: 30, description: "Code quality, design patterns and efficiency", judgeNote: "They should properly format the code." },
    { name: "Code technicality", weight: 30, description: "Code quality, design patterns and efficiency", judgeNote: "They should properly format the code." },
    { name: "Code functionality",weight: 40, description: "Code quality, design patterns and efficiency", judgeNote: "They should properly format the code." },
  ],
  scores: { "Code Quality": 30, "Code technicality": 40, "Code functionality": 80 },
  totalScore: 85,
  adminNote:
    "The candidate demonstrated strong technical proficiency and a clear understanding of the project requirements. Their approach to problem-solving was systematic, and the final delivery met all established benchmarks for quality and accuracy.",
};

// ─── View state types ─────────────────────────────────────────────────────────

export type View =
  | { name: "shortlists" }
  | { name: "evaluation"; requestId: string }
  | { name: "candidates"; requestId: string };

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ReviewPage() {
    const router = useRouter()
  const [view, setView] = useState<View>({ name: "shortlists" });

  if (view.name === "evaluation") {
    return (
      <EvaluationDetail
        {...MOCK_EVALUATION}
        onBack={() => setView({ name: "shortlists" })}
        onSubmitToShortlist={() => setView({ name: "candidates", requestId: view.requestId })}
        // onSubmitToShortlist={()=> router.push('/admin/shortlistedcandidates')}
      />
    );
  }

  if (view.name === "candidates") {
    return (
      <ShortlistCandidates
        candidates={MOCK_CANDIDATES}
        targetCount={5}
        onBack={() => setView({ name: "shortlists" })}
        onDeliver={(ids) => {
          // TODO: call your API to deliver shortlist
          console.log("Delivering candidates:", ids);
          setView({ name: "shortlists" });
        }}
      />
    );
  }

  return (
    <ShortlistsTable
      data={MOCK_SHORTLISTS}
      onReview={(id) => setView({ name: "evaluation", requestId: id })}
      onTabChange={(tab) => {
        // navigate to active requests tab if needed
        console.log("tab:", tab);
      }}
    />
  );
}
