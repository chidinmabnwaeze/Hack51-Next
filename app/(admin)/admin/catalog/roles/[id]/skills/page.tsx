"use client";
import { useParams } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { SkillLevel } from "@/types/catalog";
import { catalogService } from "@/lib/services/catalog.service";

export default function SkillLevel() {
  const levels: SkillLevel[] = ["entry-level", "mid-level", "senior"];
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const handleSave = async () => {
    if (!selectedLevel) {
      alert("Please select a skill level before saving.");
      return;
    }

    try {
      setLoading(true);
      await catalogService.updateRole(id, {
        skill_levels: [selectedLevel],
      });
      console.log("Selected Level", selectedLevel);
      router.push(`/admin/catalog/roles/${id}/rolecapabilities`);
    } catch (err: any) {
      console.log("ERROR FETCHING SKILL LEVELS", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <span
        onClick={() => router.push("/admin/catalog/roles")}
        className="cursor-pointer hover:text-red-700 my-5 text-sm text-gray-500"
      >
        <ArrowLeftIcon className="inline-block mr-1" />
        Back to Catalog
      </span>
      <section className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">{`${name} Role`}</h1>
          <p className="text-gray-600 mb-6">Manage roles and challenges</p>
        </div>
      </section>
      <div className="bg-white p-8 rounded-xl shadow-md w-full mt-8 md:w-3/4 mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="border-b border-b-gray-300 text-xl">
            Skill levels for role
          </h2>
          <button
            className="px-5 py-2.5 bg-[#F01E5A] hover:bg-[#c0144a] text-white text-sm font-semibold rounded-lg transition-colors"
            onClick={handleSave}
          >
            Save & Continue
          </button>
        </div>
        {levels.map((level) => (
          <div
            key={level}
            className="p-4 mt-4 gap-4 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedLevel(level)}
          >
            <input
              type="radio"
              name="skill-level"
              className="rounded-full"
              checked={selectedLevel === level}
              readOnly
            />
            <label htmlFor="role" className="ml-5 capitalize">
              {level.replace("-", " ")}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
