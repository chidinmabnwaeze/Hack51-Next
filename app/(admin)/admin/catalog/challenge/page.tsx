"use client";
import {
  KeyboardEventHandler,
  MouseEventHandler,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import ChallengeCardInput from "../../components/ChallengeCardInput";
import { ArrowLeftIcon, PlusCircle, X } from "lucide-react";

export type Challenge = {
  id: number;
  title: string;
  desc: string;
  scenario: string;
  req: string[];
};
export default function ChallengeDetails() {
  const router = useRouter();

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [challenge, setChallenge] = useState({
    title: "",
    desc: "",
    scenario: "",
    req: [],
  });
  const [requirement, setRequirement] = useState("");
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("challenges", JSON.stringify(challenges));
  }, [challenges]);

  // To add requirement
  const handleAddRequirement = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!requirement.trim()) return;
      if (challenge.req.length >= 3) return;

      setChallenge((prev) => ({
        ...prev,
        req: [...prev.req, requirement],
      }));

      setRequirement("");
    }
  };

  const handleSaveChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!challenge.title.trim()) return;

    const newChallenge: Challenge = {
      id: Date.now(),
      ...challenge,
    };

    setChallenges((prev) => [...prev, newChallenge]);

    // reset form
    setChallenge({
      title: "",
      desc: "",
      scenario: "",
      req: [],
    });

    setRequirement("");
    setIsSideBarOpen(false);
  };

  const handleToggle = () => {
    setIsSideBarOpen((prev: boolean) => !prev);
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
            className="flex px-5 py-2.5 bg-[#FF0046] hover:bg-[#c0144a] text-white text-sm font-semibold rounded-lg transition-colors"
            onClick={handleToggle}
          >
            <PlusCircle />
            Create Challenge
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md w-full h-full mt-4 mx-auto">
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Challenges</h1>
            </div>
            <section className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    router.push(`/admin/catalog/challenge/${item.id}`)
                  }
                  className="cursor-pointer"
                >
                  <ChallengeCardInput
                    title={item.title}
                    desc={item.desc}
                    req={item.req}
                  />
                </div>
              ))}
            </section>
          </div>
        </div>
        <button
          className="mt-8 px-5 py-2.5 bg-[#FF0046] hover:bg-[#c0144a] text-white text-sm font-semibold rounded-lg transition-colors float-end"
          onClick={() => router.push("")}
        >
          Next
        </button>
      </section>

      {/* sidebar, toggles open or close when the challenge button is clicked*/}
      {isSidebarOpen && (
        <section
          className={`fixed top-0 right-0 h-full overflow-auto w-150 bg-white shadow-lg p-8 z-50 transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <X
            className="absolute mt-3 top-0 right-0 cursor-pointer"
            onClick={handleToggle}
          />
          <form onSubmit={handleSaveChallenge}>
            <div className="mt-4">
              <label htmlFor="title">Challenge Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter Title"
                className="w-full bg-red-50 border border-red-200 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-200"
                value={challenge.title}
                onChange={(e) =>
                  setChallenge((prev) => ({ ...prev, title: e.target.value }))
                }
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
                onChange={(e) =>
                  setChallenge((prev) => ({ ...prev, desc: e.target.value }))
                }
              />
            </div>
            <div className="mt-4">
              <label htmlFor="desciption">Scenario</label>
              <textarea
                rows={5}
                name="desciption"
                placeholder="Write a scenario"
                className="w-full bg-red-50 border border-red-200 mt-4 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-200"
                value={challenge.scenario}
                onChange={(e) =>
                  setChallenge((prev) => ({
                    ...prev,
                    scenario: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mt-4">
              <label htmlFor="desciption">Add a test requirement</label>
              <input
                type="text"
                name="tests"
                placeholder="Add requirements up to 3"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                onKeyDown={handleAddRequirement}
                className="w-full bg-red-50 border border-red-200 mt-4 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>
            {challenge.req.map((item, index) => (
              <p key={index}>{item}</p>
            ))}

            <button
              onClick={handleSaveChallenge}
              className="px-5 py-2.5 mt-6 bg-[#F01E5A] hover:bg-[#c0144a] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Save
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
