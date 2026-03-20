"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ChallengeCard from "@/components/ChallengeCard";
import { ArrowLeftIcon } from "lucide-react";

export default function RoleDetails() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [createChallenge, setCreateChallenge] = useState();
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

  const [addTest, setAddTest] = useState<string[]>([]);
  const [test, setTest] = useState();

  //   const handleAdd = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent,)=>{
  //     e.preventDefault()
  // setAddTest([...addTest, test])
  //   }

  //   const handleToggle = (prev)=>{

  //   }

  return (
    <>
      <section>
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
            onClick={() => router.push(`/admin/catalog/challenge`)}
          >
            Create Challenge
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md w-full mt-10 mx-auto">
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
        </div>
      </section>

      {/* editor */}
      <section>
        <form action="">
          <div>
            <label htmlFor="title">Challenge Title</label>
            <input type="text" name="title" placeholder="Enter Title" />
          </div>
          <div>
            <label htmlFor="desciption">Description</label>
            <textarea
              rows={5}
              name="desciption"
              placeholder="Enter desciption"
            />
          </div>
          <div>
            <input
              type="text"
              name="tests"
              // onChange={()=>}
            />
          </div>
        </form>
      </section>
    </>
  );
}
