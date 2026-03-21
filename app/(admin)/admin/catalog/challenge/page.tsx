"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ChallengeCardInput from "../../components/ChallengeCardInput";
import { ArrowLeftIcon, X } from "lucide-react";

type Challenge = {
  title: string;
  desc: string;
  req: string[];
};
export default function ChallengeDetails() {
  const router = useRouter();

  const [challenge, setChallenge] = useState<Challenge>({
    title: "",
    desc: "",
    req: [],
  });
  const [requirement, setRequirement] = useState("");
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);

  const handleChange = (field: keyof Challenge, value: string) => {
    setChallenge((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddRequirement = () => {
    if (!requirement.trim()) return;

    setChallenge((prev) => ({
      ...prev,
      req: [...prev.req, requirement],
    }));

    setRequirement("");
  };

  const handleToggle = () => {
    setIsSideBarOpen((prev: boolean) => prev === !prev);
  };

  return (
    <main className="flex">
      <section className="w-full">
        <div className="flex justify-between items-center">
          <div>
            <span
              onClick={() => router.push("/admin/catalog")}
              className="cursor-pointer hover:text-red-700 my-5 text-sm text-gray-500"
            >
              <ArrowLeftIcon className="inline-block mr-1" />
              Back to Catalog
            </span>
            <section className="flex justify-between">
              <div>
                {/* <h1 className="text-2xl font-bold mb-4">{`${role.name} role`}</h1> */}
                <h1 className="text-2xl font-bold mb-4">{` role`}</h1>
                <p className="text-gray-600 mb-6">
                  Manage roles and challenges
                </p>
              </div>
            </section>
          </div>
          <button
            className="px-5 py-2.5 bg-[#F01E5A] hover:bg-[#c0144a] text-white text-sm font-semibold rounded-lg transition-colors"
            onClick={() => handleToggle()}
          >
            Create Challenge
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md w-full h-full mt-4 mx-auto">
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Challenge Details</h1>
            </div>
            <section className="mt-5 grid grid-cols-1 md:grid-cols-2  gap-6">
              {/* {cardIds.map((id) => ( */}
              <ChallengeCardInput
                //   key={id}
                //   id={id}
                title={challenge.title}
                desc={challenge.desc}
                req={challenge.req}
              />
              {/* ))} */}
            </section>
          </div>
        </div>
      </section>

      {/* editor , toggles open or close when the challenge button is clicked*/}
      {isSidebarOpen === true && (
        <section className="bg-white shadow p-8 w-2/5 rounded-lg ml-4 relative">
          <X className="absolute mt-3 top-0 right-0" />
          <form action="">
            <div className="mt-4">
              <label htmlFor="title">Challenge Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter Title"
                className="w-full bg-red-50 border border-red-200 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-200"
                value={challenge.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="desciption">Description</label>
              <textarea
                rows={5}
                name="desciption"
                placeholder="Enter desciption"
                className="w-full bg-red-50 border border-red-200 mt-4 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-200"
                value={challenge.desc}
                onChange={(e) => handleChange("desc", e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="desciption">Add a test requirement</label>
              <input
                type="text"
                name="tests"
                placeholder="Add requirement"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddRequirement();
                  }
                }}
                className="w-full bg-red-50 border border-red-200 mt-4 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>
            {challenge.req.map((item, index) => (
              <p key={index}>{item}</p>
            ))}

            <button className="px-5 py-2.5 mt-6 bg-[#F01E5A] hover:bg-[#c0144a] text-white text-sm font-semibold rounded-lg transition-colors">
              Save
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
