"use client";
import Link from "next/link";
import { ArrowLeft, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { EmployerRequest } from "@/types/employer";
import { challengeService } from "@/lib/services/challenge.service";
import { useParams } from "next/navigation";

export default function ChallengeDetailPage() {
  const [challenge, setChallenge] = useState<EmployerRequest | null>(null);

  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchChallengeById = async () => {
      try {
        const response =
          await challengeService.getCandidateChallengeDetails(id);
        setChallenge(response.data);
      } catch (err) {
        console.error("Failed to fetch challenge details:", err);
      }
    };
    fetchChallengeById();
  }, [id]);

  return (
    <>
      <div className="mb-2">
        <Link
          href="/candidate/challenges"
          className="text-sm text-gray-500 flex items-center gap-1 hover:text-[#FF1F5A] transition-colors mb-3"
        >
          <ArrowLeft size={14} /> Back to Find challenges
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Product Designer</h1>
        <p className="text-sm text-gray-400 mt-0.5">mid-level</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mt-4">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Noname Company</h2>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm text-[#FF1F5A] font-medium">
                Open for submissions
              </span>
              <span className="text-sm text-gray-500">
                Closing in{" "}
                <span className="text-[#FF1F5A] font-semibold">
                  {challenge?.deadline}
                </span>
              </span>
            </div>
          </div>
          <Link href={`/candidate/challenges/${params.id}/submit`}>
            <button className="flex items-center gap-2 bg-[#FF1F5A] hover:bg-[#e01550] text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
              Start submission <Flame size={15} />
            </button>
          </Link>
        </div>

        {/* Scenario */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-500 mb-2">Scenario</p>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 italic">
              "Define a 6-month roadmap for a high-growth fintech startup
              transitioning from local payments to cross-border remittances.
              Consider resource constraints, compliance, and market penetration
              strategies."
            </p>
          </div>
        </div>

        {/* Deliverables + Format */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded bg-[#FF1F5A] flex items-center justify-center">
                <span className="text-white text-[10px]">≡</span>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">
                Required Deliverables
              </h3>
            </div>
            <ul className="space-y-2">
              {[
                "RoadMap Document(PDF)",
                "Feature Prioritization Matrix",
                "Implementation Timeline",
              ].map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF1F5A] flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded bg-[#FF1F5A] flex items-center justify-center">
                <span className="text-white text-[10px]">▣</span>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">
                Format and Rules
              </h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Submission Format
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Upload a single zip file containing all required documents, or
                  provide a link to a secure google Drive folder with viewer.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Constraints
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Use the MoSCoW method. Max 10 pages. Do not include external
                  links or info in the artifact.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tooling Requirements */}
        <div className="border border-[#FF1F5A] bg-red-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-[#FF1F5A] mb-2">
            Tooling Requirements
          </h3>
          <p className="text-sm text-[#FF1F5A]">
            Restrictions on AI usage if used place citations / references to the
            model or agent used.
          </p>
        </div>
      </div>
    </>
  );
}
