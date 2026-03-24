"use client";
import AppLayout from "@/components/layout/AppLayout";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const declarations = [
  {
    id: "original",
    label: "Original Work Guarantee",
    text: "I declare that the submitted artifacts are my own original creation, except where explicitly permitted by the challenge disclosure rules.",
    defaultChecked: true,
  },
  {
    id: "compliance",
    label: "Compliance with rules",
    text: "I confirm I have adhered strictly to the format requirements and operational constraints outlined in the challenge brief.",
    defaultChecked: true,
  },
  {
    id: "evaluation",
    label: "Evaluation Permission",
    text: "I grant Hack51 expert reviewers and the employer permission to access, view, and score my artifacts for the purpose of this request.",
    defaultChecked: false,
  },
];

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-red-50/80 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl border border-[#FF1F5A] shadow-xl p-10 w-[420px] flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 size={32} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Submission Successful</h2>
        <p className="text-sm text-gray-500 mb-6">
          Track your submission status in the submissions dashboard
        </p>
        <Link href="/challenges">
          <button
            onClick={onClose}
            className="w-full bg-[#FF1F5A] hover:bg-[#e01550] text-white font-semibold py-3 px-8 rounded-lg text-sm transition-colors"
          >
            Back to Find Challenges
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function ReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [checks, setChecks] = useState<Record<string, boolean>>({
    original: true,
    compliance: true,
    evaluation: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const toggle = (id: string) => setChecks((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <AppLayout>
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}

      <div className="mb-2">
        <Link href={`/challenges/${params.id}/submit`} className="text-sm text-gray-500 flex items-center gap-1 hover:text-[#FF1F5A] transition-colors mb-3">
          <ArrowLeft size={14} /> Back to submission manifest
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Product Designer</h1>
        <p className="text-sm text-gray-400 mt-0.5">mid-level</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Submission Review</h2>
          <button
            onClick={() => setShowSuccess(true)}
            className="bg-[#FF1F5A] hover:bg-[#e01550] text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
          >
            Confirm Submission
          </button>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 text-base mb-0.5">Senior Product designer</h3>
          <p className="text-sm text-gray-400 mb-4">ReqID: 2330-765</p>

          <h4 className="font-semibold text-gray-800 text-sm mb-2">Summary & artifacts</h4>
          <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
            <p className="text-sm text-gray-400 italic">
              "AI was used as a supplemental tool for brainstorming and technical formatting. The core analysis and final revisions remain my own original work."
            </p>
          </div>

          <div className="inline-flex items-center gap-2 border border-[#FF1F5A] bg-red-50 text-[#FF1F5A] text-xs font-medium px-3 py-1.5 rounded-full">
            <CheckCircle2 size={13} /> Artifact link(s) provided:
          </div>
        </div>

        {/* Integrity Declarations */}
        <div>
          <h3 className="font-bold text-gray-900 text-base mb-4">Integrity Declarations (Mandatory)</h3>
          <div className="space-y-3">
            {declarations.map((d) => (
              <div
                key={d.id}
                className="border border-gray-200 rounded-lg p-4 flex items-start gap-3 cursor-pointer hover:border-gray-300 transition-colors"
                onClick={() => toggle(d.id)}
              >
                <div className={`w-5 h-5 rounded flex-shrink-0 mt-0.5 flex items-center justify-center border-2 transition-colors ${
                  checks[d.id] ? "bg-[#FF1F5A] border-[#FF1F5A]" : "border-gray-300 bg-white"
                }`}>
                  {checks[d.id] && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm mb-0.5">{d.label}</p>
                  <p className="text-sm text-gray-500">{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
