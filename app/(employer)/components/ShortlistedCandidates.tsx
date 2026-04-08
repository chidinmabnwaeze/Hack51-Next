"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Plus, Lock, ExternalLink } from "lucide-react";
import TalentListModal from "./LockedListModal";

interface CriterionBreakdown {
  label: string;
  weight: string;
  score: string;
}

interface Candidate {
  id: string;
  name: string;
  totalScore: number;
  maxScore: number;
  criteria: CriterionBreakdown[];
  expertReviewNotes: string;
}

interface ShortlistedCandidatesProps {
  shortlistId?: string;
  title?: string;
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Ikemefuna",
    totalScore: 87,
    maxScore: 100,
    criteria: [
      { label: "Technical execution", weight: "40%", score: "80%" },
      { label: "Technical Know how", weight: "30%", score: "20%" },
      { label: "Technical execution", weight: "30%", score: "50%" },
    ],
    expertReviewNotes: "Exceptional clarity and good time management.",
  },
  {
    id: "2",
    name: "Johnson ike",
    totalScore: 77,
    maxScore: 100,
    criteria: [
      { label: "Technical execution", weight: "40%", score: "80%" },
      { label: "Technical Know how", weight: "30%", score: "20%" },
      { label: "Technical execution", weight: "30%", score: "50%" },
    ],
    expertReviewNotes: "Exceptional clarity and good time management.",
  },
  {
    id: "3",
    name: "Rabiu Suleiman",
    totalScore: 75,
    maxScore: 100,
    criteria: [
      { label: "Technical execution", weight: "40%", score: "80%" },
      { label: "Technical Know how", weight: "30%", score: "20%" },
      { label: "Technical execution", weight: "30%", score: "50%" },
    ],
    expertReviewNotes: "Exceptional clarity and good time management.",
  },
  {
    id: "4",
    name: "Amos Odofin",
    totalScore: 70,
    maxScore: 100,
    criteria: [
      { label: "Technical execution", weight: "40%", score: "80%" },
      { label: "Technical Know how", weight: "30%", score: "20%" },
      { label: "Technical execution", weight: "30%", score: "50%" },
    ],
    expertReviewNotes: "Exceptional clarity and good time management.",
  },
];

export default function ShortlistedCandidates({
  shortlistId,
  title = "Shortlists",
}: ShortlistedCandidatesProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"shortlisted" | "all">(
    "shortlisted",
  );
  const [isOpen, setIsOpen] = useState(false);

  const candidates = activeTab === "shortlisted" ? mockCandidates : [];

  const onClose = () => setIsOpen(false);

  return (
    <div>
      {/* Back link */}
      <button
        onClick={() => router.push("/shortlists")}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4"
      >
        <ArrowLeft size={16} />
        Back to Shortlists
      </button>

      {/* Page header */}
      <section className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Review candidates from completed requests
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Download size={16} />
            Export CSV
          </button>
          <button className="flex items-center gap-2 bg-[#FF0046] hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Rerun request
            <Plus size={16} />
          </button>
        </div>
      </section>

      {/* Candidates card */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Tabs */}
        <div className="flex gap-6 px-6 pt-4 border-b border-gray-100">
          <button
            onClick={() => setActiveTab("shortlisted")}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "shortlisted"
                ? "border-[#FF0046] text-[#FF0046]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Shortlisted({mockCandidates.length})
          </button>
          <button
            onClick={() => {
              setActiveTab("all");
              setIsOpen(true);
            }}
            className={`pb-3 text-sm font-medium border-b-2 flex items-center gap-1 transition-colors ${
              activeTab === "all"
                ? "border-[#FF0046] text-[#FF0046]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Lock size={13} />
            All scored candidates({mockCandidates.length})
          </button>
        </div>

        {/* Candidate rows */}
        <div>
          {candidates.map((candidate, index) => (
            <div
              key={candidate.id}
              className={`grid grid-cols-[2fr_1fr_2fr_2fr] gap-6 px-6 py-6 ${
                index !== candidates.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              {/* Name + View Artifacts */}
              <div className="flex flex-col justify-center gap-4">
                <span className="text-2xl font-bold">{candidate.name}</span>
                <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 w-fit">
                  View Artifacts
                  <ExternalLink size={14} />
                </button>
              </div>

              {/* Total Request Score */}
              <div className="flex flex-col justify-center">
                <span className="text-xs text-gray-500 mb-2">
                  Total Request score
                </span>
                <span className="text-4xl font-bold text-[#FF0046]">
                  {candidate.totalScore}
                  <span className="text-lg font-normal text-gray-400">
                    /{candidate.maxScore}
                  </span>
                </span>
              </div>

              {/* Criterion Breakdown */}
              <div className="flex flex-col justify-center">
                <span className="text-xs text-gray-500 mb-3">
                  Criterion Breakdown
                </span>
                <div className="flex flex-col gap-1">
                  {candidate.criteria.map((criterion, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {criterion.label}({criterion.weight})
                      </span>
                      <span className="text-[#FF0046] font-medium ml-4">
                        {criterion.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expert Review Notes */}
              <div className="flex flex-col justify-center">
                <span className="text-xs text-gray-500 mb-2">
                  Expert Review Notes
                </span>
                <textarea
                  readOnly
                  value={candidate.expertReviewNotes}
                  rows={4}
                  className="border border-gray-200 rounded-lg p-3 text-sm text-gray-600 resize-none bg-white w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <TalentListModal
        isOpen={isOpen}
        onClose={onClose}
        // buttonText={buttonText}
      />
    </div>
  );
}
