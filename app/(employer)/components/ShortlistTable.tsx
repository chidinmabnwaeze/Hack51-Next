"use client";

import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export interface Shortlists {
  id?: string;
  role?: string;
  title: string;
  shortlist_size: number;
  date_delivered: number;
}

interface ShortlistTableProps {
  shortlists: Shortlists[];
  detailed?: boolean;
}

export default function ShortlistTable({
  shortlists,
  detailed = false,
}: ShortlistTableProps) {
  const router = useRouter();
  const headers = [
    "Request Title",
    "Shortlist size(n)",
    "Date Delivered",
    "Actions",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-50">
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-2 px-4 border-b border-gray-100 text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shortlists.map((list, idx) => (
            <tr className="border-b border-gray-100" key={idx}>
              <td className="py-2 px-4">
                <div className="flex flex-col">
                  <span className="font-semibold">{list.title}</span>
                  {detailed && (
                    <>
                      {list.id && (
                        <small className="text-gray-500">ID: {list.id}</small>
                      )}
                      {list.role && (
                        <small className="text-gray-500">{list.role}</small>
                      )}
                    </>
                  )}
                </div>
              </td>

              <td className="py-2 px-4">
                <div className="mb-2">
                  <p className="text-sm text-gray-600 mt-1">
                    {list.shortlist_size}
                  </p>
                </div>
              </td>

              <td className="py-2 px-4">{list.date_delivered ?? "-"}</td>
              {/* <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${badgeClasses(list.status)}`}
                >
                  {list.status}
                </span>
              </td> */}
              <td className="py-2 px-4 flex gap-2">
                <button
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mr-2 border border-gray-200 px-3 py-1 rounded"
                  onClick={() => router.push(`/shortlists/${list.id}`)}
                >
                  <Eye size={15} />
                  View
                </button>
                {/* <button className="text-red-500 hover:text-red-700">
                  Close Request
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
