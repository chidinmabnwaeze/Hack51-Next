"use client";

import { employerService } from "@/lib/services/employer.service";
import { EmployerRoles } from "@/types/catalog";
import { useEffect, useState } from "react";
import { useRequestStore } from "@/lib/context/useRequestStore";

export default function RoleDetails() {
  const { role } = useRequestStore();
  const [roleDetails, setRoleDetails] = useState<EmployerRoles | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!role?.id) return;
    const fetchRoleDetails = async () => {
      setLoading(true);
      try {
        const response = await employerService.getRoleById(role.id);
        setRoleDetails(response);
      } catch (err: any) {
        console.error("Error fetching role details", err.message || err?.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchRoleDetails();
  }, [role?.id]);

  if (loading) return <div className="loader mx-auto my-24"></div>;
  if (!roleDetails) return null;

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full mt-10 md:w-3/4 mx-auto">
      <h2 className="border-b border-b-gray-300 text-xl">Role Details</h2>
      <div className="flex items-center">
        <label className="block mt-4 mb-2 font-semibold">Role Title</label>
        <span className="block mt-4 mb-2 px-4">{roleDetails.name}</span>
      </div>
      <div className="flex items-center">
        <label className="block mt-4 mb-2 font-semibold">Skill Levels</label>
        <span className="block mt-4 mb-2 px-4">
          {roleDetails.catalog_skill_levels.map((s) => s.level).join(", ") || "—"}
        </span>
      </div>

      {roleDetails.capabilities && roleDetails.capabilities.length > 0 && (
        <div className="bg-white rounded-xl mt-12">
          <h2 className="border-b border-b-gray-300 text-xl">Role Capabilities</h2>
          <section className="grid w-full grid-cols-1 md:grid-cols-3 md:gap-4 mt-4">
            {roleDetails.capabilities.map((cap, i) => (
              <div key={i} className="border border-gray-100 bg-gray-50 p-5 rounded-lg">
                <h2 className="border-b border-gray-200">{cap.title}</h2>
                <p className="mt-4">{cap.summary}</p>
              </div>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
