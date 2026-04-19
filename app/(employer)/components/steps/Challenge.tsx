"use client";

import { useEffect, useState } from "react";
import { employerService } from "@/lib/services/employer.service";
import { Challenge as ChallengeType } from "@/types/employer";
import { useRequestStore } from "@/lib/context/useRequestStore";
import ChallengeCard from "../ChallengeCard";

export default function Challenge() {
  const [challenges, setChallenges] = useState<ChallengeType[]>([]);
  const [loading, setLoading] = useState(false);
  const { challenge, setChallenge, nextStep } = useRequestStore();

  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      try {
        const response = await employerService.getChallenges();
        setChallenges(response);
      } catch (err: any) {
        console.error("Error fetching challenges", err.message || err?.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  const handleSelect = (id: string) => {
    const selected = challenges.find((c) => c.id === id);
    if (!selected) return;
    setChallenge({ id: selected.id, title: selected.title });
    nextStep();
  };

  if (loading) return <div className="loader mx-auto my-24"></div>;

  return (
    <div className="mt-20">
      <h1 className="text-3xl font-bold">Challenge Details</h1>
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((c) => (
          <ChallengeCard
            key={c.id}
            id={c.id}
            title={c.title}
            description={c.description}
            isSelected={challenge?.id === c.id}
            onSelect={handleSelect}
          />
        ))}
      </section>
    </div>
  );
}
