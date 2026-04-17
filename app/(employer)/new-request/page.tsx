"use client";

import { useRouter } from "next/navigation";
import StepContent, { stepConfig } from "@/app/(employer)/components/StepContent";
import StepIndicator from "@/app/(employer)/components/StepIndicator";
import { useRequestStore } from "@/lib/context/useRequestStore";
import { ArrowLeftIcon } from "lucide-react";

export default function NewRequestPage() {
  const router = useRouter();
  const { step, nextStep, prevStep } = useRequestStore();

  return (
    <div>
      <span
        onClick={() => router.push("/requests")}
        className="cursor-pointer hover:text-red-700 my-5 text-sm text-gray-500"
      >
        <ArrowLeftIcon className="inline-block mr-1" />
        Back to requests
      </span>
      <section className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">New Request</h1>
          <p className="text-gray-600 mb-6">
            Create a new hiring request to find the best candidates for your
            team.
          </p>
        </div>
        <div>
          <button
            className="bg-[#FF0046] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={() => router.push("./custom-request")}
          >
            Create Custom Request
          </button>
        </div>
      </section>

      <StepIndicator currentStep={step} />
      <StepContent step={step} />

      <div className="flex justify-end mt-6">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg"
          >
            Previous
          </button>
        )}

        {step < stepConfig.length - 1 && (
          <button
            onClick={nextStep}
            className="bg-[#FF0046] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg ml-4"
          >
            Next
          </button>
        )}

        {step === stepConfig.length - 1 && (
          <button
            onClick={nextStep}
            className="bg-[#FF0046] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg ml-4"
          >
            Submit
          </button>
        )}

        {step === stepConfig.length && (
          <button
            onClick={() => router.push("/requests")}
            className="bg-[#FF0046] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg ml-4"
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
}
