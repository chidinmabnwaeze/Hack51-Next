"use client";
import Image from "next/image";
import { type HeaderProps } from "@/types/header";
import { User } from "@/types/user";
import { authService } from "@/lib/services/auth.service";
import { useEffect, useState } from "react";

export default function Header({ logo, avatar }: HeaderProps) {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const activeUser = authService.getCurrentUser();
    setUser(activeUser);
  }, []);
 
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-20 flex justify-between items-center px-6 py-3">
      {/* logo */}
      <div className="h-16 flex items-center">
        {logo && (
          <Image
            src={logo}
            alt="Logo"
            width={100}
            height={60}
            priority
            style={{ height: "auto", width: "auto" }}
          />
        )}
      </div>

      {/* user info */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold capitalize">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-100 border flex items-center justify-center overflow-hidden flex-shrink-0">
          <Image
            src={avatar || "/icons/avatardefault.webp"}
            alt="avatar"
            width={40}
            height={40}
            priority
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </header>
  );
}
