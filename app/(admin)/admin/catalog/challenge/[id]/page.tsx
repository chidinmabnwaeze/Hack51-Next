"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type Challenge } from "../page";
import { Trash2, PlusCircle } from "lucide-react";
import DeleteModal from "../../../components/DeleteModal";

export default function ChallengeEditor() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [requirement, setRequirement] = useState("");
  const [rejectOpen, setRejectOpen] = useState(false);

  //  Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("challenges");

    if (stored) {
      const parsed: Challenge[] = JSON.parse(stored);
      const found = parsed.find((c) => c.id === id);
      setChallenge(found || null);
    }
  }, [id]);

  if (!challenge) return <p>Loading...</p>;

  //  Save edits
  const handleSave = () => {
    const stored = localStorage.getItem("challenges");
    if (!stored) return;

    const parsed: Challenge[] = JSON.parse(stored);

    const updated = parsed.map((c) => (c.id === challenge.id ? challenge : c));

    localStorage.setItem("challenges", JSON.stringify(updated));

    router.push("/admin/catalog/challenge");
  };

  //  Delete
  const handleDelete = () => {
    const stored = localStorage.getItem("challenges");
    if (!stored) return;

    const parsed: Challenge[] = JSON.parse(stored);

    const filtered = parsed.filter((c) => c.id !== challenge.id);

    localStorage.setItem("challenges", JSON.stringify(filtered));

    router.push("/admin/catalog/challenge");
  };

  //   const removeRequirement = (index: number) => {
  //   const newRequirements = [...requirement];
  //   newRequirements.splice(index, 1);
  //   setRequirement(newRequirements);
  // };

  // const [deliverable, setDeliverable] = useState<string[]>();
  // const [value, setValue] = useState("");

  // const addDeliverable = (
  //   e: React.FormEvent<HTMLFormElement> | React.MouseEvent,
  // ) => {
  //   e.preventDefault();
  //   if (!value.trim()) return;
  //   setDeliverable([...deliverable, value]);
  //   setValue("");
  // };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full mt-10 md:w-3/4 mx-auto">
      <h2 className="border-b border-b-gray-300 text-xl">Challenge Editor</h2>

      <div className="bg-white rounded-xl mt-12">
        <h2>Title</h2>
        <input
          value={challenge.title}
          onChange={(e) =>
            setChallenge({ ...challenge, title: e.target.value })
          }
          className="w-full mb-4 border border-gray-100 bg-gray-50 p-5 rounded-lg"
        />
      </div>

      <div className="bg-white rounded-xl mt-12">
        <h2>Challenge Summary</h2>
        <textarea
          value={challenge.desc}
          onChange={(e) => setChallenge({ ...challenge, desc: e.target.value })}
          className="w-full mb-4 border border-gray-100 bg-gray-50 p-5 rounded-lg"
        />
      </div>

      <div className="bg-white rounded-xl mt-12">
        <h2>Scenario</h2>
        <textarea
          value={challenge.scenario}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              scenario: e.target.value,
            })
          }
          className="w-full mb-4 border border-gray-100 bg-gray-50 p-5 rounded-lg"
        />
      </div>
      <div className="bg-white rounded-xl mt-12">
        <h2>Deliverables</h2>
        <section className="mt-4">
          {challenge.req.map((r, index) => (
            <div className="flex justify-between items-center" key={index}>
              <input
                className="border border-gray-100 bg-gray-50 p-2 rounded-lg w-full"
                key={index}
                value={r}
                onChange={(e) => {
                  const updated = [...challenge.req];
                  updated[index] = e.target.value;
                  setChallenge({ ...challenge, req: updated });
                }}
              />
              {/* <button
                  onClick={() => removeRequirement(index)}
                  className="ml-4 hover:text-red-700"
                >
                  <Trash2 />
                </button> */}
            </div>
          ))}
          <form className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Add Deliverable"
                className="border border-dashed rounded-full p-2 pl-10"
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
              />
              <PlusCircle
                className="ml-2 cursor-pointer absolute top-0 bottom-0 left-0 my-auto text-gray-400"
                // onClick={addDeliverable}
              />
            </div>
          </form>
        </section>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setRejectOpen(true)}
          className="bg-gray-300 px-4 py-2"
        >
          Delete
        </button>

        <button
          onClick={handleSave}
          className="bg-red-500 text-white px-4 py-2"
        >
          Save
        </button>
      </div>
      <DeleteModal
        isOpen={rejectOpen}
        onClose={() => setRejectOpen(false)}
        onConfirm={handleDelete}
      />
      
    </div>
  );
}
