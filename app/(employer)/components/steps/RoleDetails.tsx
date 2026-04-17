import { employerService } from "@/lib/services/employer.service";
import { EmployerRoles } from "@/types/catalog";
import { useEffect, useState } from "react";

// const details = [
//   { title: "Role Title", value: "Software Engineer" },
//   { title: "Role Level", value: "Expert level" },
// ];

export default function RoleDetails() {
  const [roleDetails, setRoleDetails] = useState<EmployerRoles[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoleDetails = async (id: string) => {
      try {
        const response = await employerService.getRoleById(id);
        setRoleDetails(response);
      } catch (err: any) {
        console.error(
          "Error fetching roles",
          err.message || err?.response?.data,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchRoleDetails(id);
  });
  if (loading) return <div className="loader mx-auto my-24"></div>;
  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full mt-10 md:w-3/4 mx-auto">
      <h2 className="border-b border-b-gray-300 text-xl">Role Details</h2>
      {roleDetails.map((detail, index) => (
        <>
          <div className="flex items-center" key={index}>
            <label className="block mt-4 mb-2 font-semibold">Role Title</label>
            <span className="block mt-4 mb-2 px-4">{detail.name}</span>
          </div>
          <div className="flex items-center" key={index}>
            <label className="block mt-4 mb-2 font-semibold">Role Level</label>
            <span className="block mt-4 mb-2 px-4">
              {detail.catalog_skill_levels}
            </span>
          </div>
        </>
      ))}

      {roleDetails.capabilities.map((cap) => {
        <div className="bg-white rounded-xl mt-12">
          <h2 className="border-b border-b-gray-300 text-xl">
            Role Capabilities
          </h2>
          <section className="grid w-full grid-cols-1 md:grid-cols-3 md:gap-4 mt-4">
            <div className="border border-gray-100 bg-gray-50 p-5 rounded-lg">
              <h2 className="border-b border-gray-200">{cap.title}</h2>
              <p className="mt-4">{cap.summary}</p>
            </div>
          </section>
        </div>;
      })}
    </div>
  );
}
