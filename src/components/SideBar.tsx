import React from "react";
import { IoMdPaper } from "react-icons/io";
import { IoBasketOutline, IoPieChartOutline } from "react-icons/io5";
import { SideBarItem } from "./SideBarItem";
import { HiOutlineUserGroup } from "react-icons/hi";

import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import Image from "next/image";

import { LogoutButton } from "./LogoutButton";
import { getSessionServer } from "@/app/auth/actions/auth-actions";

export interface MenuItems {
  title: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItems[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: <IoPieChartOutline size={20} />,
  },
  {
    path: "/dashboard/quotations",
    title: "Quotations",
    icon: <IoMdPaper size={20} />,
  },
  {
    path: "/dashboard/products",
    title: "Products",
    icon: <IoBasketOutline size={20} />,
  },
  {
    path: "/dashboard/customers",
    title: "Customers",
    icon: <HiOutlineUserGroup size={20} />,
  },
  {
    path: "/dashboard/services",
    title: "Services",
    icon: <HiOutlineWrenchScrewdriver size={20} />,
  },
];
export async function SideBar() {
  const session = await getSessionServer();

  return (
    <aside
      id="sidebar"
      className="fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
      aria-label="Sidebar"
    >
      <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
        <div className="mt-8 text-center">
          <Image
            src={
              session?.user?.image ??
              "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
            }
            alt=""
            width={50}
            height={50}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {session?.user?.name ?? "usuario"}
          </h5>
          <span className="hidden text-gray-400 lg:block">
            Privilege: {session?.user?.role}
          </span>
        </div>
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 bg-white divide-y space-y-1">
            <ul className="space-y-2 pb-2">
              {menuItems.map((item) => (
                <SideBarItem key={item.path} {...item} />
              ))}
            </ul>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
