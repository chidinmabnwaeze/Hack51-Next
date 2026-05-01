"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, Link2, Download, ChevronDown } from "lucide-react";
import RejectModal from "./RejectModal";
import { useRouter } from "next/navigation";
import { reviewService } from "@/lib/services/review.service";
import { SubmissionFullDetail } from "@/types/submissions";
import { Scoring } from "@/types/score";

export default function EvaluationDetail({ id }: SubmissionFullDetail) {
  const [rejectOpen, setRejectOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"link" | "document">("link");
  const [scores, setScores] = useState<Record<string, number>>({});
  const [scoreOption, setScoreOption] = useState({
    criterion_id: "",
    criterion_title: "",
    weight: 0,
    score_percent: 0,
    reviewer_note: "",
  });
  const [reviewNote, setReviewNote] = useState("");
  const [submissionDetail, setSubmissionDetail] =
    useState<SubmissionFullDetail | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const router = useRouter();
  const handleReject = (reason: string) => {
    // TODO: wire to API
    // console.log("Rejected:", submissionId, "Reason:", reason);
  };

  useEffect(() => {
    const fetchSubmissionDetail = async (id: string) => {
      try {
        const response = await reviewService.getSubmissionsById(id);
        const data = response.data;
        setSubmissionDetail(data);
        //store reviewer notes
        setReviewNote(data.reviewer_notes || "");

        //store scores
        const restoredScores: Record<string, number> = {};
        if (Array.isArray(data.submission_scores)) {
          data.submission_scores.forEach((score: any) => {
            restoredScores[score.criterion_id] = score.score_percent;
          });
        }
        setScores(restoredScores);
      } catch (err: any) {
        console.error("Error Fetching submission detail", err.message);
      }
    };
    fetchSubmissionDetail(id);
  }, [id]);

  //admin scores the candidates' submission
  // const scoreSubmission = async (id: string, data: Scoring) => {
  //   try {
  //     const scoreData: Scoring = {
  //       scores: [
  //         {
  //           criterion_id: scoreOption.criterion_id,
  //           criterion_title: scoreOption.criterion_title,
  //           weight: scoreOption.weight,
  //           score_percent: scoreOption.score_percent,
  //         },
  //       ],
  //       reviewer_notes: reviewNote,
  //     };

  //     const response = await reviewService.scoreSubmission(id, scoreData);
  //     setScores(response.data);
  //     setReviewNote(reviewNote);
  //   } catch (err) {
  //     console.log("Error scoring with rubric :", err);
  //   }
  // };

  const buildScorePayload = () => {
    if (!submissionDetail) return null;

    return {
      scores:
        submissionDetail.job_requests.snapshot_challenge.rubric_criteria.map(
          (item) => ({
            criterion_id: item.id,
            criterion_title: item.title,
            weight: item.weight,
            score_percent: scores[item.id] ?? 0,
          }),
        ),
      reviewer_notes: reviewNote,
    };
  };

  // useEffect(() => {
  const handleSubmitScores = async () => {
    if (!submissionDetail) return;
    try {
      // setSaving(true);
      // setSaved(false);

      const payload = buildScorePayload();
      if (!payload) return;

      const response = await reviewService.scoreSubmission(
        submissionDetail.id,
        payload,
      );

      console.log("Scored successfully", response);
      setSaved(true);
    } catch (err) {
      console.error("Error scoring:", err);
    } finally {
      setSaving(false);
    }
  };
  // }, 800);
  // return () => clearTimeout(timeout);
  // }, [scores, reviewNote]);

  // const totalScore = submissionDetail
  // ? submissionDetail.job_requests.snapshot_challenge.rubric_criteria.reduce(
  //     (acc, item) => {
  //       const score = scores[item.id] ?? 0;
  //       return acc + (score * item.weight) / 100;
  //     },
  //     0
  //   )
  // : 0;

  return (
    <>
      {/* Candidate bar */}
      {submissionDetail && (
        <>
          <div className="bg-white rounded-xl px-6 py-4 flex items-center justify-between shadow-sm border border-gray-100 mb-5">
            <div>
              <p className="font-bold text-base capitalize">
                {submissionDetail.users.first_name}{" "}
                {submissionDetail.users.last_name}
              </p>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                {submissionDetail.id}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setRejectOpen(true)}
                className="px-5 py-2.5 bg-[#F01E5A] hover:bg-[#c0144a] text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Reject submission
              </button>
              <button
                onClick={() => router.push("/admin/shortlists")}
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
                <h2 className="text-base font-bold mb-4">
                  Candidate Submission
                </h2>

                <p className="text-sm font-semibold mb-2">Scenario</p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-600 italic leading-relaxed">
                  "{submissionDetail.job_requests.snapshot_challenge.scenario}"
                </div>

                <p className="text-sm font-semibold mt-4 mb-2">
                  Artifact uploaded
                </p>
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setActiveTab("link")}
                    className={`flex-1 flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-r border-gray-200 transition-colors ${
                      activeTab === "link" ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <Link2 size={14} className="text-gray-400" />
                    <span className="text-[#F01E5A] underline">
                      Link submitted by candidate :
                      {activeTab === "link" && (
                        <div>
                          {submissionDetail.artifact_urls.map((url, i) => (
                            <a
                              key={i}
                              href={url}
                              target="_blank"
                              className="text-blue-600 underline block"
                            >
                              {url}
                            </a>
                          ))}
                        </div>
                      )}
                      {/* <p>{submissionDetail.artifact_urls}</p> */}
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
                    {activeTab === "document" && (
                      <p>{submissionDetail.artifact_type}</p>
                    )}
                  </button>
                </div>

                <p className="text-sm font-semibold mt-4 mb-2">
                  Submission statement
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-600 italic leading-relaxed">
                  "{submissionDetail.submission_statement}"
                </div>
              </div>

              {/* Expert Evaluations card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-base font-bold mb-4">Expert Evaluations</h2>

                <p className="text-sm font-semibold mb-2">Deliverables</p>
                <div className="space-y-2.5">
                  {submissionDetail.job_requests.snapshot_challenge.deliverables.map(
                    (d) => (
                      <div
                        key={d}
                        className="flex items-center gap-2.5 text-sm"
                      >
                        {/* <span
                          className={`w-3 h-3 rounded-full shrink-0 ${
                            d.submitted
                              ? "bg-[#F01E5A]"
                              : "border-2 border-gray-300 bg-transparent"
                          }`}
                        /> */}
                        {d}
                      </div>
                    ),
                  )}
                </div>

                <p className="text-sm font-semibold mt-5 mb-2">
                  Score against Rubric
                </p>
                <div className="space-y-2.5">
                  {submissionDetail.job_requests.snapshot_challenge.rubric_criteria.map(
                    (item) => (
                      <div
                        key={item.title}
                        className="flex items-center border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <span className="flex-1 px-4 py-3 text-sm font-medium bg-white">
                          {item.title}
                        </span>
                        <div className="relative border-l border-gray-200 bg-gray-50">
                          <select
                            value={scores[item.id] ?? 0}
                            onChange={(e) =>
                              setScores((prev) => ({
                                ...prev,
                                [item.id]: Number(e.target.value),
                              }))
                            }
                            className="appearance-none px-4 py-3 pr-8 text-sm font-semibold bg-transparent outline-none cursor-pointer min-w-20"
                          >
                            {[0, 20, 40, 60, 80, 100].map((val) => (
                              <option key={val} value={val}>
                                {val}%
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={12}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>

                <p className="text-sm font-semibold mt-5 mb-2">
                  Admin review Note
                </p>
                <textarea
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-600"
                  placeholder="Write review notes..."
                />
                <div className="mt-5">
                  <p className="text-sm font-bold mb-1">Total Score</p>
                  <span className="text-4xl font-bold text-[#F01E5A]">
                    {submissionDetail.total_score}
                    {/* {totalScore} */}
                  </span>
                  <span className="text-2xl font-semibold text-gray-800">
                    /100
                  </span>
                </div>
                {/* <div className="text-sm">
                {saving && <span className="text-gray-500">Saving...</span>}
                {!saving && saved && (
                  <span className="text-green-600">Saved</span>
                )}
              </div> */}
                <button
                  onClick={handleSubmitScores}
                  disabled={saving}
                  className="mt-6 px-5 py-2 bg-[#FF0046] text-white rounded-lg"
                >
                  {saving ? "Submitting..." : "Submit Score"}
                  {/* Submit Score */}
                </button>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="space-y-5">
              {/* Format & Rules */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-[#F01E5A] mb-4">
                  Format and Rules
                </h3>
                <div className="mb-4">
                  <p className="text-sm font-bold mb-1.5">Submission Format</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {
                      submissionDetail.job_requests.snapshot_challenge
                        .submission_format
                    }
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold mb-1.5">Constraints</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {/* Use the MoSCoW method. Max 10 pages. Do not include external
                    links or info in the artifact. */}
                    {
                      submissionDetail.job_requests.snapshot_challenge
                        .constraints_text
                    }
                  </p>
                </div>
              </div>

              {/* Scoring Rubric */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-[#F01E5A] mb-4">
                  Scoring Rubric
                </h3>
                <div className="space-y-3">
                  {submissionDetail.job_requests.snapshot_rubric.map((item) => (
                    <div
                      key={item.title}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-3.5"
                    >
                      <p className="text-[11px] text-gray-400 mb-1">
                        Scoring Weight %: {item.weight}
                      </p>
                      <p className="text-sm font-bold mb-0.5">{item.title}</p>
                      <p className="text-[11px] text-gray-400 mb-2">
                        {item.description}
                      </p>
                      <p className="text-[11px] text-gray-500 mb-1">
                        Judge note
                      </p>
                      {/* <textarea
                    defaultValue={item.judgeNote}
                    rows={2}
                    className="w-full border border-gray-200 rounded-md px-2.5 py-2 text-xs text-gray-600 bg-white font-[family-name:var(--font-dm-sans)] resize-none outline-none focus:border-[#F01E5A] transition-colors"
                  /> */}
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
            candidateName={submissionDetail.users.first_name}
          />
        </>
      )}
    </>
  );
}
