"use client";

import { useState } from "react";
import { ChevronLeft, Link2, Download, ChevronDown } from "lucide-react";
import RejectModal from "./RejectModal";

interface RubricItem {
  name: string;
  weight: number;
  description: string;
  judgeNote: string;
}

interface Deliverable {
  label: string;
  submitted: boolean;
}

export interface EvaluationDetailProps {
  submissionId: string;
  candidateName: string;
  scenario: string;
  submissionStatement: string;
  deliverables: Deliverable[];
  rubricItems: RubricItem[];
  scores: Record<string, number>;
  totalScore: number;
  adminNote: string;
  onBack: () => void;
  onSubmitToShortlist: () => void;
}

const scoreOptions = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export default function EvaluationDetail({
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
  const [rejectOpen, setRejectOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"link" | "document">("link");
  const [scores, setScores] = useState(initialScores);

  const handleReject = (reason: string) => {
    // TODO: wire to API
    console.log("Rejected:", submissionId, "Reason:", reason);
  };

  return (
    <>
      {/* Back link */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#F01E5A] transition-colors mb-4"
      >
        <ChevronLeft size={16} />
        Back to Submissions
      </button>

      <h1 className="text-2xl font-bold">Evaluation</h1>
      <p className="text-sm text-gray-400 mt-0.5 mb-5">
        Evaluate requests and shortlist candidates
      </p>

      {/* Candidate bar */}
      <div className="bg-white rounded-xl px-6 py-4 flex items-center justify-between shadow-sm border border-gray-100 mb-5">
        <div>
          <p className="font-bold text-base">{candidateName}</p>
          <p className="text-xs text-gray-400 font-mono mt-0.5">{submissionId}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setRejectOpen(true)}
            className="px-5 py-2.5 bg-[#F01E5A] hover:bg-[#c0144a] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Reject submission
          </button>
          <button
            onClick={onSubmitToShortlist}
            className="px-5 py-2.5 border-2 border-[#F01E5A] text-gray-800 hover:bg-red-50 text-sm font-semibold rounded-lg transition-colors"
          >
            Submit to shortlists
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-[1fr_300px] gap-6">
        {/* LEFT */}
        <div className="space-y-5">
          {/* Candidate Submission card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-base font-bold mb-4">Candidate Submission</h2>

            <p className="text-sm font-semibold mb-2">Scenario</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-600 italic leading-relaxed">
              "{scenario}"
            </div>

            <p className="text-sm font-semibold mt-4 mb-2">Artifact uploaded</p>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveTab("link")}
                className={`flex-1 flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-r border-gray-200 transition-colors ${
                  activeTab === "link" ? "bg-gray-50" : "bg-white"
                }`}
              >
                <Link2 size={14} className="text-gray-400" />
                <span className="text-[#F01E5A] underline">
                  Link submitted by candidate
                </span>
              </button>
              <button
                onClick={() => setActiveTab("document")}
                className={`flex-1 flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === "document" ? "bg-gray-50" : "bg-white"
                }`}
              >
                <Download size={14} className="text-gray-400" />
                Document submitted by candidate
              </button>
            </div>

            <p className="text-sm font-semibold mt-4 mb-2">Submission statement</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-600 italic leading-relaxed">
              "{submissionStatement}"
            </div>
          </div>

          {/* Expert Evaluations card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-base font-bold mb-4">Expert Evaluations</h2>

            <p className="text-sm font-semibold mb-2">Deliverables</p>
            <div className="space-y-2.5">
              {deliverables.map((d) => (
                <div key={d.label} className="flex items-center gap-2.5 text-sm">
                  <span
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      d.submitted
                        ? "bg-[#F01E5A]"
                        : "border-2 border-gray-300 bg-transparent"
                    }`}
                  />
                  {d.label}
                </div>
              ))}
            </div>

            <p className="text-sm font-semibold mt-5 mb-2">Score against Rubric</p>
            <div className="space-y-2.5">
              {rubricItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center border border-gray-200 rounded-lg overflow-hidden"
                >
                  <span className="flex-1 px-4 py-3 text-sm font-medium bg-white">
                    {item.name}
                  </span>
                  <div className="relative border-l border-gray-200 bg-gray-50">
                    <select
                      value={scores[item.name] ?? 0}
                      onChange={(e) =>
                        setScores((prev) => ({
                          ...prev,
                          [item.name]: Number(e.target.value),
                        }))
                      }
                      className="appearance-none px-4 py-3 pr-8 text-sm font-semibold bg-transparent outline-none cursor-pointer min-w-[80px]"
                    >
                      {scoreOptions.map((v) => (
                        <option key={v} value={v}>
                          {v}%
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={12}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm font-semibold mt-5 mb-2">Admin review Note</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-600 italic leading-relaxed">
              "{adminNote}"
            </div>

            <div className="mt-5">
              <p className="text-sm font-bold mb-1">Total Score</p>
              <span className="text-4xl font-bold text-[#F01E5A]">{totalScore}</span>
              <span className="text-2xl font-semibold text-gray-800">/100</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-5">
          {/* Format & Rules */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-[#F01E5A] mb-4">Format and Rules</h3>
            <div className="mb-4">
              <p className="text-sm font-bold mb-1.5">Submission Format</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Upload a single zip file containing all required documents, or provide a
                link to a secure google Drive folder with viewer.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold mb-1.5">Constraints</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Use the MoSCoW method. Max 10 pages. Do not include external links or info
                in the artifact.
              </p>
            </div>
          </div>

          {/* Scoring Rubric */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-[#F01E5A] mb-4">Scoring Rubric</h3>
            <div className="space-y-3">
              {rubricItems.map((item) => (
                <div
                  key={item.name}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3.5"
                >
                  <p className="text-[11px] text-gray-400 mb-1">
                    Scoring Weight %: {item.weight}
                  </p>
                  <p className="text-sm font-bold mb-0.5">{item.name}</p>
                  <p className="text-[11px] text-gray-400 mb-2">{item.description}</p>
                  <p className="text-[11px] text-gray-500 mb-1">Judge note</p>
                  <textarea
                    defaultValue={item.judgeNote}
                    rows={2}
                    className="w-full border border-gray-200 rounded-md px-2.5 py-2 text-xs text-gray-600 bg-white font-[family-name:var(--font-dm-sans)] resize-none outline-none focus:border-[#F01E5A] transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <RejectModal
        isOpen={rejectOpen}
        onClose={() => setRejectOpen(false)}
        onConfirm={handleReject}
        candidateName={candidateName}
      />
    </>
  );
}
