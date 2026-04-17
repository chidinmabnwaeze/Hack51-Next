import { employerService } from "@/lib/services/employer.service";
import { Role } from "@/types/employer";
import { useEffect, useState } from "react";
import { useRequestStore } from "@/lib/context/useRequestStore";

// const levels = ["Entry Level", "Intermediate Level", "Senior Level", "Lead"]
export interface Levels {
  id: "";
  role_level: "";
}
export default function SkillLevel() {
  const [roleLevels, setRoleLevels] = useState([]);
  const [selectedLevel, setSelected] = useState<string>("")
    const { role_level, setRoleLevel, nextStep } = useRequestStore();

  // useEffect(() => {
  //   const fetchSkills = async () => {
  //     try {
  //       const response = await employerService.getRoles();
  //       setRoleLevels(response);
  //     } catch (err: any) {
  //       console.log(err.message);
  //     }
  //   };
  //   fetchSkills();
  // }, []);

  const handleSelect = (selected : string)=>{
    setRoleLevel(selected);
    nextStep();
  }


  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full mt-8 md:w-3/4 mx-auto">
      <h2 className="border-b border-b-gray-300 text-xl">
        Select skill level for the role
      </h2>
      {roleLevels.map((level) => (
        <div
          key={level}
          className="p-4 mt-4 gap-4 cursor-pointer hover:bg-gray-100"
        >
          <input type="checkbox" className="rounded-full" onClick={()=>handleSelect(level)}/>
          <label htmlFor="role" className="ml-5">
            {level}
          </label>
        </div>
      ))}
    </div>
  );
}
