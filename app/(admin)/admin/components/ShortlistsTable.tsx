"use client";

import { useState } from "react";
import { Search, ChevronDown, Eye, ChevronLeft, ChevronRight } from "lucide-react";

export type ShortlistStatus = "in_review" | "delivered";

export interface ShortlistRow {
  id: string;
  requestTitle: string;
  requestId: string;
  shortlistSize: number;
  status: ShortlistStatus;
}

interface ShortlistsTableProps {
  data: ShortlistRow[];
  onReview: (id: string) => void;
  onTabChange?: (tab: "active_requests" | "shortlists") => void;
}

const StatusBadge = ({ status }: { status: ShortlistStatus }) => {
  if (status === "in_review") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-600 border border-yellow-200">
        In review
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
      Delivered
    </span>
  );
};

const ITEMS_PER_PAGE = 10;

export default function ShortlistsTable({
  data,
  onReview,
  onTabChange,
}: ShortlistsTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = data.filter(
    (row) =>
      row.requestTitle.toLowerCase().includes(search.toLowerCase()) ||
      row.requestId.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div>
      <h1 className="text-2xl font-bold">Review</h1>
      <p className="text-sm text-gray-400 mt-0.5 mb-6">
        Evaluate requests and shortlist candidates
      </p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b-2 border-gray-200 px-6 pt-4">
          <button
            onClick={() => onTabChange?.("active_requests")}
            className="px-5 py-3 text-sm font-semibold text-gray-400 border-b-2 border-transparent -mb-0.5 transition-colors hover:text-gray-700"
          >
            Active Requests
          </button>
          <button
            className="px-5 py-3 text-sm font-semibold text-[#F01E5A] border-b-2 border-[#F01E5A] -mb-0.5"
          >
            Shortlists
          </button>
        </div>

        <div className="p-6">
          {/* Search + Filter */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 flex items-center gap-2.5 bg-white border border-gray-200 rounded-3xl px-4 py-2.5">
              <Search size={15} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by id, name.."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="text-sm flex-1 outline-none bg-transparent placeholder:text-gray-400"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
              Filter
              <ChevronDown size={13} />
            </button>
          </div>

          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4">
                  Request Title
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4">
                  Shortlist Size(n)
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 pb-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-sm text-gray-400">
                    No shortlists found
                  </td>
                </tr>
              ) : (
                paginated.map((row) => (
                  <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 pr-4">
                      <p className="text-sm font-semibold">{row.requestTitle}</p>
                      <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                        ID: {row.requestId}
                      </p>
                    </td>
                    <td className="py-4 pr-4 text-base font-semibold">
                      {row.shortlistSize}
                    </td>
                    <td className="py-4 pr-4">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => onReview(row.id)}
                        className="flex items-center gap-2 text-sm font-bold hover:text-[#F01E5A] transition-colors"
                      >
                        Review
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
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
