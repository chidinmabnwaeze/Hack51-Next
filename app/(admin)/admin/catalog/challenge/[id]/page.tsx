"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type Challenge } from "../page";

// type Challenge = {
//   id: number;
//   title: string;
//   desc: string;
//   scenario: string;
//   req: string[];
// };

export default function ChallengeEditor() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [challenge, setChallenge] = useState<Challenge | null>(null);

  // ✅ Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("challenges");

    if (stored) {
      const parsed: Challenge[] = JSON.parse(stored);
      const found = parsed.find((c) => c.id === id);
      setChallenge(found || null);
    }
  }, [id]);

  if (!challenge) return <p>Loading...</p>;

  // ✅ Save edits
  const handleSave = () => {
    const stored = localStorage.getItem("challenges");
    if (!stored) return;

    const parsed: Challenge[] = JSON.parse(stored);

    const updated = parsed.map((c) =>
      c.id === challenge.id ? challenge : c
    );

    localStorage.setItem("challenges", JSON.stringify(updated));

    router.push("/admin/catalog/challenge");
  };

  // ✅ Delete
  const handleDelete = () => {
    const stored = localStorage.getItem("challenges");
    if (!stored) return;

    const parsed: Challenge[] = JSON.parse(stored);

    const filtered = parsed.filter(
      (c) => c.id !== challenge.id
    );

    localStorage.setItem("challenges", JSON.stringify(filtered));

    router.push("/admin/catalog/challenge");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Challenge Editor
      </h1>

      <input
        value={challenge.title}
        onChange={(e) =>
          setChallenge({ ...challenge, title: e.target.value })
        }
        className="w-full border p-3 mb-4"
      />

      <textarea
        value={challenge.desc}
        onChange={(e) =>
          setChallenge({ ...challenge, desc: e.target.value })
        }
        className="w-full border p-3 mb-4"
      />

      <textarea
        value={challenge.scenario}
        onChange={(e) =>
          setChallenge({
            ...challenge,
            scenario: e.target.value,
          })
        }
        className="w-full border p-3 mb-4"
      />

      {challenge.req.map((r, i) => (
        <input
          key={i}
          value={r}
          onChange={(e) => {
            const updated = [...challenge.req];
            updated[i] = e.target.value;
            setChallenge({ ...challenge, req: updated });
          }}
          className="w-full border p-2 mb-2"
        />
      ))}

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleDelete}
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
    </div>
  );
}