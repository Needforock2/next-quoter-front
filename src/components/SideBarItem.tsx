'use client'
import React from "react";
import type { MenuItems } from "./SideBar";
import Link from "next/link";
import { usePathname } from "next/navigation";


export function SideBarItem({ path, icon, title }: MenuItems) {
  
  const actualPath = usePathname();
  return (
    <li>
      <Link
        href={path}
        className={`text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group ${
          actualPath ===path   && "bg-gray-100"
        }`}
      >
        {icon}
        <span className="ml-3">{title}</span>
      </Link>
    </li>
  );
}
