import type { Shortlists } from "../components/ShortlistTable";
import ChallengeButton from "../components/ChallengeButton";
import ShortlistTable from "../components/ShortlistTable";

export default function ShortlistPage() {
  const shortlists: Shortlists[] = [
    {
      id: "REQ-2401-09",
      title: "Senior Product Designer",
      role: "Product Designer (L3)",
      shortlist_size: 5,
      date_delivered: 12 - 1 - 2026,
    },
    {
      id: "REQ-2401-12",
      title: "Backend Engineer (Go/Rust)",
      role: "Backend Engineer (L4)",
      shortlist_size: 5,
      date_delivered: 12 - 1 - 2026,
    },
    {
      id: "REQ-2401-15",
      title: "Marketing Lead (Growth)",
      role: "Marketing Lead (L4)",
      shortlist_size: 5,
      date_delivered: 12 - 1 - 2026,
    },
    {
      id: "REQ-2402-01",
      title: "Q2 Junior Frontend Intake",
      role: "Frontend Engineer (L1)",
      shortlist_size: 5,
      date_delivered: 12 - 1 - 2026,
    },
    {
      id: "REQ-2312-05",
      title: "Staff Data Scientist",
      role: "Data Scientist (L5)",
      shortlist_size: 5,
      date_delivered: 12 - 1 - 2026,
    },
  ];

  return (
    <div>
      <section className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Shortlists</h1>
          <p className="text-gray-600 mt-2">
            Manage the lifecycle of your hiring challenges across all statuses.
          </p>
        </div>
      </section>

      {/* tabs */}
      <section className="mt-6 border-b border-gray-200">
        <div>
          <button className="px-4 py-2 border-b-2 border-[#FF0046] text-[#FF0046] font-medium">
            Active Requests
          </button>
          <button className="px-4 py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
            Drafts
          </button>
          <button className="px-4 py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
            Closed
          </button>
        </div>
      </section>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <input
          type="text"
          placeholder="Search requests by title or ID..."
          className="border border-gray-100 p-2 rounded-lg shadow w-full md:w-1/2"
        />
        <div className="flex gap-2">
          <button className="border border-gray-200 px-4 py-2 rounded hover:bg-gray-50">
            Filter Status
          </button>
          <button className="border border-gray-200 px-4 py-2 rounded hover:bg-gray-50">
            Sort
          </button>
        </div>
      </div>

      <section className="mt-6 shadow bg-white p-6 rounded-2xl">
        <ShortlistTable shortlists={shortlists} detailed />
      </section>

      <div className="flex justify-end items-center mt-4 gap-2">
        <button className="px-4 py-2 border border-[#FF0046] rounded text-[#FF0046] hover:bg-gray-50">
          PREV
        </button>
        <button className="px-4 py-2 border border-[#FF0046] rounded text-[#FF0046] hover:bg-gray-50">
          NEXT
        </button>
      </div>
    </div>
  );
}
