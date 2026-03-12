"use client";

import Image from "next/image";

type HeaderProps = {
  logo: string;
  firstname: string;
  lastname: string;
  usermode: string;
  avatar: string;
};

export default function Header({
  logo,
  firstname,
  lastname,
  usermode,
  avatar,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-20 flex justify-between items-center px-6 py-3">
      {/* logo */}
      <div>
        <Image
          src={logo}
          alt="Logo"
          width={120}
          height={72}
          className="h-18 w-auto"
        />
      </div>

      {/* user info */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold">
            {firstname} {lastname}
          </p>
          <p className="text-sm text-gray-500">{usermode}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-100 border flex items-center justify-center overflow-hidden">
          <Image
            src={avatar}
            alt="avatar"
            width={32}
            height={32}
            className="w-full h-full object-cover"
            onError={() => {}}
          />
        </div>
      </div>
    </header>
  );
}
