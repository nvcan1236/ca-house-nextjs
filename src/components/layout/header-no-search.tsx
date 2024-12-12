"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoginButton from "../common/LoginButton";
import { useAuthStore } from "@/providers/auth-store-provider";
import UserMenuPopover from "../common/UserMenuPopover";

const HeaderNoSearch = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const user = useAuthStore((state) => state.user);

  return (
    <header
      className={`container ${
        scrollY > 0 ? "" : ""
      }`}
    >
      <div
        className={`md:px-10 grid grid-cols-10 lg:gap-10 items-center py-4 md:gap-x-4 transition-all`}
      >
        <Link className="hidden md:block col-span-2" href="/">
          <Image
            src="/logo.png"
            alt="logo"
            className="object-cover mx-auto"
            width={80}
            height={80}
          />
        </Link>

        <div className="grow md:px-4 px-2 gc8 col-span-6"></div>

        <div className="flex gap-2 col-span-2">
          <div className="flex gap-3 item-center">
            <div className="hidden md:block">
              {user && Object.keys(user).length > 0 ? (
                <UserMenuPopover user={user} />
              ) : (
                <LoginButton />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderNoSearch;
