"use client";

import { PlusCircle, Pencil, Trash2, Check, ChevronRight } from "lucide-react";
import { useState } from "react";
import ReviewTable from "./ReviewTable";
import { useRouter } from "next/navigation";

type Role = {
  id: number;
  name: string;
  isEditing: boolean;
};

export default function RoleCreation({ params }: any) {
  const [roles, setRoles] = useState<Role[]>([]);
  //   const {id} = params

  const handleCreate = () => {
    setRoles([...roles, { id: Date.now(), name: "", isEditing: true }]);
  };

  const handleChange = (id: number, value: string) => {
    setRoles((prev) =>
      prev.map((role) => (role.id === id ? { ...role, name: value } : role)),
    );
  };

  const handleSave = (id: number) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.id === id && role.name.trim()
          ? { ...role, isEditing: false }
          : role,
      ),
    );
  };

  const handleEdit = (id: number) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.id === id ? { ...role, isEditing: true } : role,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setRoles((prev) => prev.filter((role) => role.id !== id));
  };

  const router = useRouter();
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm w-full mt-8 md:w-3/4 mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-b-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-800">Roles Created</h2>

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg"
        >
          Create new role
          <PlusCircle size={18} />
        </button>
      </div>

      {/* Roles */}
      <div className="mt-4">
        {roles.map((role) => (
          <div
            key={role.id}
            className="group flex items-center justify-between py-3 border-b last:border-none"
          >
            {/* LEFT SIDE */}
            <div
              className="flex items-center gap-3 w-full"
              onClick={() => router.push(`/admin/catalog/skills`)}
              // onClick={()=>router.push(`catalog/${id}/skills`)}
            >
              {/* Arrow */}
              <ChevronRight className="text-gray-400" size={18} />

              {/* Content */}
              {role.isEditing ? (
                <input
                  type="text"
                  value={role.name}
                  autoFocus
                  placeholder="Type role name..."
                  onChange={(e) => handleChange(role.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave(role.id);
                  }}
                  className="w-full bg-red-50 border border-red-200 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-200"
                />
              ) : (
                <p className="text-gray-800">{role.name || "Untitled Role"}</p>
              )}
            </div>

            {/* RIGHT SIDE (ACTIONS) */}
            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition">
              {role.isEditing ? (
                <Check
                  size={18}
                  className="cursor-pointer text-green-600 hover:scale-110 transition"
                  onClick={() => handleSave(role.id)}
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
    </div>
  );
}
