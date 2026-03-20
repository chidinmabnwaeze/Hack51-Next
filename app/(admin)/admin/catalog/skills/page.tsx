"use client";
import { useParams } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SkillLevel({ params }: any) {
  const levels = ["Entry Level", "Intermediate Level", "Senior Level", "Lead"];

  const { id } = params;
  const router = useRouter();
  return (
    <section>
      <span
        onClick={() => router.push("/admin/catalog")}
        className="cursor-pointer hover:text-red-700 my-5 text-sm text-gray-500"
      >
        <ArrowLeftIcon className="inline-block mr-1" />
        Back to Catalog
      </span>
      <section className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">{` role`}</h1>
          <p className="text-gray-600 mb-6">Manage roles and challenges</p>
        </div>
      </section>
      <div className="bg-white p-8 rounded-xl shadow-md w-full mt-8 md:w-3/4 mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="border-b border-b-gray-300 text-xl">
            Skill levels for role
          </h2>
          <button className="px-5 py-2.5 bg-[#F01E5A] hover:bg-[#c0144a] text-white text-sm font-semibold rounded-lg transition-colors"
          onClick={()=>router.push(`/admin/catalog/rolecapabilities`)}>
            
            Save & Continue
          </button>
        </div>
        {levels.map((level, index) => (
          <div
            key={index}
            className="p-4 mt-4 gap-4 cursor-pointer hover:bg-gray-100"
          >
            <input type="checkbox" className="rounded-full" />
            <label htmlFor="role" className="ml-5">
              {level}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
