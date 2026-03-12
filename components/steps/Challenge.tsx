"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ChallengeCard from "@/components/ChallengeCard";

export default function Challenge() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const router = useRouter();
  const cardIds = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleSelect = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleUse = () => {
    if (selectedId !== null) {
      router.push(`/shortlists?selectedChallengeId=${selectedId}`);
    }
  };

  return (
    <div className="mt-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Challenge Details</h1>
      </div>
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardIds.map((id) => (
          <ChallengeCard
            key={id}
            id={id}
            isSelected={selectedId === id}
            onSelect={handleSelect}
          />
        ))}
      </section>
    </div>
  );
}
