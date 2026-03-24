"use client"

import { useRouter } from "next/navigation";
import { ArrowLeftIcon, PlusCircle } from "lucide-react";
import SuccessModal from "../../components/SuccessModal";
import { useState } from "react";

export default function RubricEditor() {
  const router = useRouter();


  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSave = () => {
    setIsSuccessModalOpen(true);
  };
  return (
    <>
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
              <p className="text-gray-600 mb-6">Manage roles and challenges</p>
            </div>
          </section>
        </div>
        <button
          className="flex px-5 py-2.5 bg-[#FF0046] hover:bg-[#c0144a] text-white text-sm font-semibold rounded-lg transition-colors"
          onClick={handleSave}
        >
         
          Save Role
        </button>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-md w-full mt-10 md:w-3/4 mx-auto">
        <h2 className="border-b border-b-gray-300 text-xl">Rubric Editor</h2>
        <section className="bg-gray-100 p-5 rounded-xl mt-12">
          <div className="flex">
            <h2>Scoring Weight % :</h2>
            <span className="text-green-500">50%</span>
          </div>
          <div className="border border-gray-100 bg-white p-2 mt-2 rounded-lg">
            <p className="font-bold w-full p-2 border-none outline-none">Criteria 1: Code Functionality</p>
          </div>
          <div className="border border-gray-100 bg-white p-2 mt-2 rounded-lg">
            <textarea rows={5} className="mt-2 w-full p-2 border-none outline-none" placeholder="e.g This criterion evaluates whether the submitted code meets the
              specified requirements and functions correctly."/>
           
          </div>
          <div className="border border-gray-100 bg-white p-2 mt-2 rounded-lg">
            <input type="text" className="font-bold w-full p-2 border-none outline-none" placeholder="Judges Notes"/>
          </div>
        </section>
      </div>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onConfirm={handleSave}
      />
    </>
  );
}