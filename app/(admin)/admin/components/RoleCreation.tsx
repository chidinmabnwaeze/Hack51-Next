"use client";

import { PlusCircle, Pencil, Trash2, Check, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import ReviewTable from "./ReviewTable";
import { useRouter } from "next/navigation";
import { catalogService } from "@/lib/services/catalog.service";
import { RoleCreationPayload } from "@/types/catalog";

type Role = {
  id: number;
  name: string;
  isEditing: boolean;
};

export default function RoleCreation() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [roleName, setRoleName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await catalogService.getRoles();
        console.log("FETCH ROLES", response);
        setRoles(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error(
          "ERROR FETCHING ROLES",
          err.response?.data || err.message,
        );
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const createRoleButton = () => {
    setRoles((prev) => [
      { id: Date.now(), name: "", isEditing: true },
      ...prev,
    ]);
  };

  const handleCreate = async () => {
    if (!roleName.trim()) return;

    try {
      const createRole = await catalogService.createRole({
        name: roleName,
      });
      const createdRole = createRole.data;
      console.log("CREATE ROLE", createRole);
      setRoles((prev) => [
        ...prev,
        { id: createdRole.id, name: createdRole, isEditing: false },
      ]);
      setRoleName("");
    } catch (err: any) {
      console.error("ERROR CREATING ROLE", err.response?.data || err.message);
    }
  };

  // const handleChange = (id: number, value: string) => {
  //   setRoles((prev) =>
  //     prev.map((role) => (role.id === id ? { ...role, name: value } : role)),
  //   );
  // };

  // const handleSave = async (id: number) => {
  //   setRoles((prev) =>
  //     prev.map((role) =>
  //       role.id === id && role.trim()
  //         ? { ...role, isEditing: false }
  //         : role,
  //     ),
  //   );
  // };

  const handleEdit = async (id: number) => {
    try {
      const editRole = await catalogService.updateRole(id.toString(), {
        name: roles.find((role) => role.id === id)?.name || "",
      });
      console.log("EDIT ROLE", editRole);
      setRoles((prev) =>
        prev.map((role) =>
          role.id === id ? { ...role, name: roleName } : role,
        ),
      );
    } catch (err: any) {
      console.error("ERROR EDITING ROLE", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const deleteRole = await catalogService.deleteRole(id.toString());
      setRoles((prev) => prev.filter((role) => role.id !== id));
      console.log("DELETE ROLE", deleteRole);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const router = useRouter();
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm w-full mt-8 md:w-3/4 mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-b-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-800">Roles Created</h2>

        <button
          onClick={createRoleButton}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg"
        >
          Create new role
          <PlusCircle size={18} />
        </button>
      </div>

      {/* Roles */}
      {loading ? (
        <p className="text-gray-500 mt-4">Loading roles...</p>
      ) : (
        <div className="mt-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="group flex items-center justify-between py-3 border-b border-b-gray-200 last:border-none"
            >
              {/* LEFT SIDE */}
              <div
                className="flex items-center gap-3 w-full "
                // onClick={() => router.push(`/admin/catalog/skills`)}
              >
                {/* Arrow */}
                <ChevronRight
                  className="text-gray-400 cursor-pointer"
                  size={18}
                  onClick={() =>
                    router.push(`/admin/catalog/roles/${role.id}/skills`)
                  }
                />

                {/* Content */}
                {role.isEditing ? (
                  <input
                    type="text"
                    value={roleName}
                    autoFocus
                    placeholder="Type role name..."
                    onChange={(e) => setRoleName(e.target.value)}
                    className="w-full bg-red-50 border border-red-200 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-200"
                  />
                ) : (
                  <p className="text-gray-800">
                    {role.name || "Untitled Role"}
                  </p>
                )}
              </div>

              {/* RIGHT SIDE (ACTIONS) */}
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition">
                {role.isEditing ? (
                  <Check
                    size={18}
                    className="cursor-pointer text-green-600 hover:scale-110 transition"
                    onClick={handleCreate}
                  />
                ) : (
                  <Pencil
                    size={18}
                    className="cursor-pointer text-gray-500 hover:text-black transition"
                    onClick={() => handleEdit(role.id)}
                  />
                )}

                <Trash2
                  size={18}
                  className="cursor-pointer text-gray-400 hover:text-red-500 transition"
                  onClick={() => handleDelete(role.id)}
                />
              </div>
            </div>
          ))}

          {/* Empty State */}
          {roles.length === 0 && (
            <p className="text-gray-400 text-sm mt-4">No roles created yet.</p>
          )}
        </div>
      )}
      {/* <div>
         <button onClick={() => router.push(`/admin/catalog/${role.id}/skills`)}>Save</button>
      </div> */}
    </div>
  );
}
