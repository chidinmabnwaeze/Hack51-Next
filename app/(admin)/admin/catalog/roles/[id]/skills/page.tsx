"use client";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { SkillLevel } from "@/types/catalog";
import { catalogService } from "@/lib/services/catalog.service";

export default function SkillLevelPage() {
  const levels: SkillLevel[] = ["entry-level", "mid-level", "senior"];
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel | null>(null);
  const [roleName, setRoleName] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  useEffect(() => {
    catalogService.getRoleById(id).then((res) => {
      const role = res?.data ?? res;
      setRoleName(role?.name ?? "");
      // Pre-select existing skill level if already saved
      const existing = role?.catalog_skill_levels?.[0];
      if (existing) {
        const level = typeof existing === "string" ? existing : existing?.level;
        if (levels.includes(level as SkillLevel)) setSelectedLevel(level as SkillLevel);
      }
    }).catch(() => {});
  }, [id]);

  const handleSave = async () => {
    if (!selectedLevel) {
      alert("Please select a skill level before continuing.");
      return;
    }
    try {
      setLoading(true);
      await catalogService.updateRole(id, { skill_levels: [selectedLevel] });
      router.push(`/admin/catalog/roles/${id}/rolecapabilities`);
    } catch (err: any) {
      console.error("ERROR SAVING SKILL LEVEL", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <span
        onClick={() => router.push("/admin/catalog/roles")}
        className="cursor-pointer hover:text-red-700 my-5 text-sm text-gray-500 flex items-center gap-1 w-fit"
      >
        <ArrowLeftIcon size={14} />
        Previous: Roles
      </span>

      <div>
        <h1 className="text-2xl font-bold mb-1">{roleName ? `${roleName} Role` : "Role"}</h1>
        <p className="text-gray-600 mb-6">Manage roles and challenges</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md w-full mt-8 md:w-3/4 mx-auto">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold">Skill level for role</h2>
          <button
            className="px-5 py-2.5 bg-[#F01E5A] hover:bg-[#c0144a] disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </div>

        <div className="mt-4">
          {levels.map((level) => (
            <div
              key={level}
              className={`flex items-center gap-4 p-4 mt-2 rounded-lg cursor-pointer border transition-colors ${
                selectedLevel === level
                  ? "border-[#FF0046] bg-red-50"
                  : "border-transparent hover:bg-gray-50"
              }`}
              onClick={() => setSelectedLevel(level)}
            >
              <input
                type="radio"
                name="skill-level"
                checked={selectedLevel === level}
                readOnly
                className="accent-[#FF0046]"
              />
              <label className="capitalize cursor-pointer">{level.replace(/-/g, " ")}</label>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
