"use client";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { catalogService } from "@/lib/services/catalog.service";

export default function RoleDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [roleDetails, setRoleDetails] = useState({
    name: "",
    skill_levels: "",
  });

  useEffect(() => {
    const fetchRoleDetails = async () => {
      try {
        const response = await catalogService.getRoles();
        setRoleDetails({
          name: response.data.name,
          skill_levels: response.data.skill_levels,
        });
      } catch (err: any) {
        console.log("ERROR FETCHING ROLE DETAILS", err.message);
      }
    };
    fetchRoleDetails();
  }, []);

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
          {/* <h1 className="text-2xl font-bold mb-4">{`${role.name} role`}</h1> */}
          <h1 className="text-2xl font-bold mb-4">{` role`}</h1>
          <p className="text-gray-600 mb-6">Manage roles and challenges</p>
        </div>
      </section>

      <div className="bg-white p-8 rounded-xl shadow-md w-full mt-10 md:w-3/4 mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="border-b border-b-gray-300 text-xl">Role Details</h2>
          <button
            className="px-5 py-2.5 bg-[#F01E5A] hover:bg-[#c0144a] text-white text-sm font-semibold rounded-lg transition-colors"
            onClick={() => router.push(`/admin/catalog/challenge`)}
          >
            Save & Continue
          </button>
        </div>

        <div className="flex flex-col items-center">
          <label className="block mt-4 mb-2 font-semibold">Role Title</label>
          <div className="block mt-4 m-4 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500">
            {roleDetails.name}
          </div>
          <label className="block mt-4 mb-2 font-semibold">Role Level</label>
          <div className="block mt-4 m-4 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500">
            {roleDetails.skill_levels}
          </div>
        </div>

        <div className="bg-white rounded-xl mt-12">
          <h2 className="border-b border-b-gray-300 text-xl">
            Role Capabilities
          </h2>
          <section className="grid w-full grid-cols-1 md:grid-cols-2 md:gap-4 mt-4">
            <div className="border border-gray-100 bg-gray-50 p-5 rounded-lg">
              <input
                className="border-b border-gray-200 p-4 w-full rounded focus:ring-1 focus:ring-[#FF0046]"
                placeholder="Enter Capability Title"
              />

              <input
                className="mt-4 p-4 border border-gray-300 rounded-lg w-full focus:ring-1 focus:ring-[#FF0046]"
                placeholder="Describe the capability summary"
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
