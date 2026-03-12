"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

type SidebarProps = {
  title: string;
  items: { name: string; icon: string; path: string }[];
};

export default function Sidebar({ title, items }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 pt-16 z-10">
      <div className="text-2xl font-bold p-4">{title}</div>
      <nav className="flex flex-col gap-2 p-4">
        {items.map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={index}
              href={item.path}
              className={`block p-2 font-semibold rounded-lg hover:bg-gray-100 text-gray-800 hover:text-gray-900 ${
                isActive ? "bg-[#FF0046] text-white hover:bg-red-700 hover:text-white" : "bg-white"
              }`}
            >
              {item.icon && (
                <Image
                  src={item.icon}
                  alt={`${item.name} icon`}
                  width={20}
                  height={20}
                  className="inline-block w-5 h-5 mr-2"
                />
              )}
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* logout */}
      <div className="absolute bottom-0 left-0 w-full p-4">
        <Link
          href="/logout"
          className="block p-2 text-red-500 font-bold bg-white hover:bg-red-600 hover:text-white rounded"
        >
          <Image
            src="/icons/logout.svg"
            alt="Logout icon"
            width={20}
            height={20}
            className="inline-block w-5 h-5 mr-2"
          />
          Logout
        </Link>
      </div>
    </aside>
  );
}
