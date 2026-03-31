"use client";

import Image from "next/image";
import { type HeaderProps } from "@/types/header";
import { User } from "@/types/user";
import { authService } from "@/lib/services/auth.service";
import { useEffect, useState } from "react";

export default function Header({ logo }: HeaderProps) {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const activeUser = authService.getCurrentUser();
    setUser(activeUser);
  }, []);

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
          <p className="font-semibold capitalize">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-100 border flex items-center justify-center overflow-hidden">
          <Image
            src={"/public/icons/avatardefault.webp"}
            alt="avatar"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
