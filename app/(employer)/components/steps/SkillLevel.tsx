"use client";

import { useRequestStore } from "@/lib/context/useRequestStore";

export default function SkillLevel() {
  const { role, role_level, setRoleLevel, nextStep } = useRequestStore();

  const handleSelect = (item: { id: string; level: string }) => {
    setRoleLevel(item);
    nextStep();
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full mt-8 md:w-3/4 mx-auto">
      <h2 className="border-b border-b-gray-300 text-xl">
        Select skill level for the role
      </h2>
      {!role?.catalog_skill_levels.length && (
        <p className="mt-6 text-gray-500">No skill levels defined for this role.</p>
      )}
      {role?.catalog_skill_levels.map((item) => (
        <div
          key={item.id}
          className="p-4 mt-4 gap-4 cursor-pointer hover:bg-gray-100 flex items-center"
          onClick={() => handleSelect(item)}
        >
          <input
            type="radio"
            name="skill_level"
            value={item.level}
            checked={role_level?.id === item.id}
            readOnly
            className="rounded-full p-2"
          />
          <label className="ml-5 cursor-pointer capitalize">{item.level}</label>
        </div>
      ))}
    </div>
  );
}
