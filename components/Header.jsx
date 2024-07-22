"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const path = usePathname();
  return (
    <div className="flex p-5 w-full items-center justify-between px-10 bg-indigo-300">
      <Image src={"/logo.svg"} width={160} height={100} alt="logoko" />
      <ul className="flex gap-6 md:hidden">
        <li
          className={`hover:font-bold hover:text-primary cursor-pointer ${
            path == "/home" && "font-bold text-primary"
          }`}
        >
          Home
        </li>
        <li
          className={`hover:font-bold hover:text-primary cursor-pointer ${
            path == "/dashboard" && "font-bold text-primary"
          }`}
        >
          Dashboard
        </li>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
