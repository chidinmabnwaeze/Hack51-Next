"use client";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeftIcon, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { catalogService } from "@/lib/services/catalog.service";

const MAX_CAPABILITIES = 3;

type Capability = {
  title: string;
  summary: string;
};

export default function RoleDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [roleDetails, setRoleDetails] = useState({ name: "", skill_levels: "" });
  const [capabilities, setCapabilities] = useState<Capability[]>([{ title: "", summary: "" }]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchRoleDetails = async () => {
      setLoading(true);
      try {
        const response = await catalogService.getRoleById(id);
        console.log("ROLE BY ID RESPONSE", response);
        // API interceptor already unwraps axiosResponse.data, so the role may be
        // at response.data (if body is { data: {...} }) or at response directly.
        const role = response?.data ?? response;
        // Backend returns skill levels as catalog_skill_levels (array of objects or strings)
        const rawLevels: any[] = role?.catalog_skill_levels ?? [];
        const skillLevel = rawLevels
          .map((item) => (typeof item === "string" ? item : item?.level ?? item?.name ?? ""))
          .filter(Boolean)
          .join(", ");
        setRoleDetails({
          name: role?.name ?? "",
          skill_levels: skillLevel,
        });
        // Backend returns capabilities as catalog_capabilities
        const existingCaps: any[] = role?.catalog_capabilities ?? [];
        if (existingCaps.length) {
          setCapabilities(
            existingCaps.slice(0, MAX_CAPABILITIES).map((c) => ({
              title: c.title ?? "",
              summary: c.summary ?? "",
            })),
          );
        }
      } catch (err: any) {
        console.error("ERROR FETCHING ROLE DETAILS", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoleDetails();
  }, [id]);

  const handleCapabilityChange = (index: number, field: keyof Capability, value: string) => {
    setCapabilities((prev) =>
      prev.map((cap, i) => (i === index ? { ...cap, [field]: value } : cap)),
    );
  };

  const addCapability = () => {
    if (capabilities.length < MAX_CAPABILITIES) {
      setCapabilities((prev) => [...prev, { title: "", summary: "" }]);
    }
  };

  const removeCapability = (index: number) => {
    if (capabilities.length > 1) {
      setCapabilities((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    const filled = capabilities.filter((c) => c.title.trim() || c.summary.trim());
    if (!filled.length) return;

    setSaving(true);
    try {
      const response = await catalogService.updateRole(id, { capabilities: filled });
      console.log("UPDATE ROLE CAPABILITIES", response);
      router.push(`/admin/catalog/challenges?catalog_role_id=${id}`);
    } catch (err: any) {
      console.error("ERROR UPDATING ROLE CAPABILITIES", err.response?.data || err.message);
    } finally {
      setSaving(false);
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
          <h1 className="text-2xl font-bold mb-4">Role</h1>
          <p className="text-gray-600 mb-6">Manage roles and challenges</p>
        </div>
      </section>

      <div className="bg-white p-8 rounded-xl shadow-md w-full mt-10 md:w-3/4 mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="border-b border-b-gray-300 text-xl">Role Details</h2>
          <button
            className="px-5 py-2.5 bg-[#F01E5A] hover:bg-[#c0144a] disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save & Continue"}
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm mt-6">Loading role details...</p>
        ) : (
          <div className="flex flex-col">
            <div>
              <h1 className="block mt-4 mb-2 font-semibold">Role Title</h1>
              <p className="text-gray-700">{roleDetails.name || "—"}</p>
            </div>
            <div>
              <label className="block mt-4 mb-2 font-semibold">Role Level</label>
              <p className="text-gray-700">{roleDetails.skill_levels || "—"}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl mt-12">
          <div className="flex items-center justify-between border-b border-b-gray-300 pb-2">
            <h2 className="text-xl">Role Capabilities</h2>
            {capabilities.length < MAX_CAPABILITIES && (
              <button
                onClick={addCapability}
                className="flex items-center gap-1.5 text-sm text-[#F01E5A] hover:text-[#c0144a] font-medium transition"
              >
                <PlusCircle size={16} />
                Add Capability
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {capabilities.map((cap, index) => (
              <div key={index} className="border border-gray-100 bg-gray-50 p-5 rounded-lg relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Capability {index + 1}
                  </span>
                  {capabilities.length > 1 && (
                    <button onClick={() => removeCapability(index)}>
                      <Trash2 size={15} className="text-gray-400 hover:text-red-500 transition" />
                    </button>
                  )}
                </div>

                <input
                  className="border-b border-gray-200 p-3 w-full bg-white rounded focus:outline-none focus:ring-1 focus:ring-[#FF0046]"
                  placeholder="Enter Capability Title"
                  value={cap.title}
                  onChange={(e) => handleCapabilityChange(index, "title", e.target.value)}
                />

                <textarea
                  className="mt-3 p-3 border border-gray-200 rounded-lg w-full bg-white focus:outline-none focus:ring-1 focus:ring-[#FF0046] resize-none"
                  placeholder="Describe the capability summary"
                  rows={3}
                  value={cap.summary}
                  onChange={(e) => handleCapabilityChange(index, "summary", e.target.value)}
                />
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-3">
            {capabilities.length}/{MAX_CAPABILITIES} capabilities added
          </p>
        </div>
      </div>
    </section>
  );
}
