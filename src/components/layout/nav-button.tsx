"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavButtons = () => {
  const pathname = usePathname();
  const role = pathname.includes("motels") ? "motel" : "post";
  return (
    <div
      className={`flex gap-2 p-1 border border-gray-300 rounded-xl  bg-gray-50 `}
    >
      <Link href={"/motels"}>
        <Button
          className={`md:w-[120px] w-24 ${role === "post" && "text-gray-500"}`}
          variant={role === "motel" ? "default" : "ghost"}
        >
          Trọ
        </Button>
      </Link>
      <Link href={"/posts"}>
        <Button
          className={`md:w-[120px] w-24 ${role === "motel" && "text-gray-500"}`}
          variant={role === "post" ? "default" : "ghost"}
        >
          Bài đăng
        </Button>
      </Link>
    </div>
  );
};

export default NavButtons;
