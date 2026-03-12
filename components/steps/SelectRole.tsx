"use client";

import { useState } from "react";

interface RoleProps {
  roles?: string[];
  onChange?: (role: string) => void;
}

const defaultRoles = ["Software Engineer", "Product Manager", "Designer"];

export default function SelectRole({
  roles = defaultRoles,
  onChange,
}: RoleProps) {
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const role = event.target.value;
    setSelectedRole(role);
    onChange?.(role);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full mt-8 md:w-3/4 mx-auto">
      <h2 className="border-b border-b-gray-300 text-xl">
        Select one from existing roles
      </h2>
      {roles.map((role, index) => (
        <div
          key={index}
          className="p-4 mt-4 gap-4 cursor-pointer hover:bg-gray-100 flex items-center"
        >
          <input
            type="radio"
            name="role"
            value={role}
            checked={selectedRole === role}
            onChange={handleRoleChange}
            className="rounded-full p-2 checked:bg-red-700"
          />
          <label htmlFor="role" className="ml-3">
            {role}
          </label>
        </div>
      ))}
    </div>
  );
}
