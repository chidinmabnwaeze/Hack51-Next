"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CandidateRow {
  id: string;
  submissionId: string;
  candidateName: string;
  dateEvaluated: string;
  score: number;
}

interface ShortlistCandidatesProps {
  candidates: CandidateRow[];
  targetCount: number;
  onBack: () => void;
  onDeliver: (selectedIds: string[]) => void;
}

const ITEMS_PER_PAGE = 10;

export default function ShortlistCandidates({
  candidates,
  targetCount,
  onBack,
  onDeliver,
}: ShortlistCandidatesProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(candidates.length / ITEMS_PER_PAGE));
  const paginated = candidates.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDeliver = () => {
    onDeliver(Array.from(selected));
  };

  return (
    <div>
      {/* Back */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#F01E5A] transition-colors mb-4"
      >
        <ChevronLeft size={16} />
        Back to Shortlists
      </button>

      <h1 className="text-2xl font-bold">Shortlists</h1>
      <p className="text-sm text-gray-400 mt-0.5 mb-6">
        Evaluate requests and shortlist candidates
      </p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <p className="text-lg font-bold">
            Select n candidates{" "}
            <span className="text-[#F01E5A]">({selected.size})</span>
          </p>
          <button
            onClick={handleDeliver}
            disabled={selected.size === 0}
            className="px-6 py-3 bg-[#F01E5A] hover:bg-[#c0144a] disabled:opacity-40 disabled:cursor-default text-white text-sm font-bold rounded-lg transition-colors"
          >
            Deliver shortlist
          </button>
        </div>

        {/* Table */}
        <div className="px-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="w-10 pb-3 pt-4" />
                <th className="text-left text-xs font-semibold text-gray-400 pb-3 pt-4 pr-4">
                  Submission ID
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 pb-3 pt-4 pr-4">
                  Candidate name
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 pb-3 pt-4 pr-4">
                  Date evaluated
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 pb-3 pt-4">
                  Score/100
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors"
                  onClick={() => toggle(row.id)}
                >
                  <td className="py-4 pr-3">
                    <input
                      type="checkbox"
                      checked={selected.has(row.id)}
                      onChange={() => toggle(row.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 rounded accent-[#F01E5A] cursor-pointer"
                    />
                  </td>
                  <td className="py-4 pr-4 text-xs font-mono text-gray-600">
                    {row.submissionId}
                  </td>
                  <td className="py-4 pr-4 text-sm">{row.candidateName}</td>
                  <td className="py-4 pr-4 text-sm text-gray-500">
                    {row.dateEvaluated}
                  </td>
                  <td className="py-4 text-sm font-bold text-[#F01E5A] font-mono">
                    {row.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 text-sm font-semibold disabled:text-gray-300 hover:text-[#F01E5A] transition-colors disabled:cursor-default"
            >
              <ChevronLeft size={16} />
              Prev
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${
                    page === n
                      ? "bg-[#F01E5A] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {n}
                </button>
              ))}
              {totalPages > 3 && (
                <span className="text-sm text-gray-400">4...{totalPages}</span>
              )}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1.5 text-sm font-semibold disabled:text-gray-300 hover:text-[#F01E5A] transition-colors disabled:cursor-default"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
