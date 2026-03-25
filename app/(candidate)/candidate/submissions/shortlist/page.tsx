// import AppLayout from "@/components/layout/AppLayout";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ShortlistPage() {
  return (
    <>
      <div className="mb-2">
        <Link href="/submissions" className="text-sm text-gray-500 flex items-center gap-1 hover:text-[#FF1F5A] transition-colors mb-3">
          <ArrowLeft size={14} /> Back to Submissions
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Shortlist</h1>
        <p className="text-sm text-gray-400 mt-0.5">Track your active applications and historical performance.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mt-4">
        {/* Congratulations Banner */}
        <div className="bg-green-50 rounded-xl p-8 flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle2 size={28} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Congratulations</h2>
          <p className="text-sm text-gray-700 max-w-lg font-medium">
            Congratulations on being shortlisted. You've stood out among a highly competitive talent pool. Your profile is now being prioritized for the final hiring pipeline.
          </p>
        </div>

        {/* Company Info */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 text-base mb-4">Noname Company</h3>
          <div>
            <p className="text-sm text-gray-500 mb-0.5">Role:</p>
            <p className="font-bold text-gray-900">Senior Product designer</p>
            <p className="text-sm text-gray-400 mt-0.5">SUB-123RE-43</p>
          </div>
        </div>

        {/* Invitation Request */}
        <div className="border border-blue-300 bg-blue-50 rounded-lg p-4">
          <p className="text-sm font-semibold text-blue-600 mb-2">Invitation Request</p>
          <div className="border-t border-blue-200 pt-2">
            <p className="text-sm text-blue-500">
              If you are selected and invitation request would be sent by the employer to your email.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
