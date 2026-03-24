// import AppLayout from "@/components/layout/AppLayout";
import Link from "next/link";
import { Lock, RefreshCw } from "lucide-react";

const stats = [
  { label: "Active Submissions", value: "32", sub: "Currently reviewing", icon: "📋", border: "border-[#FF1F5A]" },
  { label: "Challenges Passed", value: "16", sub: "", icon: "✅", border: "border-[#FF1F5A]" },
  { label: "Submissions Rejected", value: "1", sub: "Fix and resubmit", icon: "❌", border: "border-[#FF1F5A]" },
  { label: "New Challenges", value: "120", sub: "in the last 30 days", icon: "🔔", border: "border-[#FF1F5A]" },
];

const submissions = [
  { role: "Backend Engineer(Rust)", id: "SUB-123RE-43", date: "2024-04-07", status: "pending" },
  { role: "Backend Engineer(Rust)", id: "SUB-123RE-43", date: "2024-04-07", status: "rejected" },
  { role: "Backend Engineer(Rust)", id: "SUB-123RE-43", date: "2024-04-07", status: "pending" },
  { role: "Backend Engineer(Rust)", id: "SUB-123RE-43", date: "2024-04-07", status: "pending" },
  { role: "Backend Engineer(Rust)", id: "SUB-123RE-43", date: "2024-04-07", status: "pending" },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "rejected") {
    return (
      <span className="px-3 py-1 rounded-full border border-[#FF1F5A] text-[#FF1F5A] text-xs font-medium">
        Rejected
      </span>
    );
  }
  return (
    <span className="px-3 py-1 rounded-full border border-blue-300 text-blue-500 text-xs font-medium">
      Pending evaluation
    </span>
  );
}

function ActionCell({ status }: { status: string }) {
  if (status === "rejected") {
    return (
      <span className="font-semibold text-gray-800 text-sm cursor-pointer hover:text-[#FF1F5A] transition-colors flex items-center gap-1">
        <RefreshCw size={13} /> Resubmit
      </span>
    );
  }
  return (
    <span className="text-gray-400 text-sm flex items-center gap-1">
      <Lock size={13} /> Locked
    </span>
  );
}

export default function CandidateDashboardPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Track your active applications and historical performance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className={`bg-white rounded-xl border-t-2 ${s.border} p-5 shadow-sm`}>
            <div className="text-xl mb-2">{s.icon}</div>
            <p className="text-sm text-gray-600 mb-1">{s.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-gray-900">{s.value}</span>
              {s.sub && <span className="text-xs text-gray-400">{s.sub}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Active Submissions</h2>
          <Link href="/submissions" className="text-sm text-gray-600 hover:text-[#FF1F5A] font-medium flex items-center gap-1">
            View all ▾
          </Link>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-100">
              <th className="pb-3 text-sm font-medium text-gray-500">Challenge Details</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Submission Date</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
              <th className="pb-3 text-sm font-medium text-gray-500 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, i) => (
              <tr key={i} className="border-b border-gray-50 last:border-0">
                <td className="py-4">
                  <p className="font-semibold text-gray-900 text-sm">{sub.role}</p>
                  <p className="text-xs text-gray-400">{sub.id}</p>
                </td>
                <td className="py-4 text-sm text-gray-700">{sub.date}</td>
                <td className="py-4"><StatusBadge status={sub.status} /></td>
                <td className="py-4 text-right"><ActionCell status={sub.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
          <button className="text-sm text-gray-500 flex items-center gap-1">← Prev</button>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#FF1F5A] text-white font-medium">1</span>
            <span className="text-gray-500">2</span>
            <span className="text-gray-500">3</span>
            <span className="text-gray-500">4...29</span>
          </div>
          <button className="text-sm text-[#FF1F5A] flex items-center gap-1 font-medium">Next →</button>
        </div>
      </div>
   
    </>
  );
}
