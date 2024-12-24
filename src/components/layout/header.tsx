"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "@/providers/auth-store-provider"
import { HousePlusIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import LoginButton from "@/components/common/login-button"
import NavButtons from "@/components/layout/nav-button"
import SearchInput from "@/components/search/search-input"

const Header = () => {
  // const role = useAppSelector((state) => state.common.role);
  // const user = useAppSelector((state) => state.auth.user);
  // const dispatch = useAppDispatch();
  // const changeLanguage = (value: language) => {
  //   i18n.changeLanguage(value);
  // };
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const user = useAuthStore((state) => state.user)

  const pathname = usePathname()
  const handleCreateMotel = () => {
    // if (!user || !user.id) {
    //   toast.warning("Vui lòng đăng nhập trước!!");
    //   return;
    // }
    toast(pathname)
    // router.push("/motels/register")
  }
  const hasSearch = ["/motels"].includes(pathname)

  const hasNav = ["/motels", "/posts"].includes(pathname)

  return (
    <header
      className={`container z-20 fixed left-1/2 -translate-x-1/2 ${
        scrollY > 0 ? "" : ""
      }`}
    >
      <div
        className={`md:px-10 grid grid-cols-10 lg:gap-10 items-center py-4 md:gap-x-4 transition-all ${
          scrollY > 20
            ? "bg-background border shadow-lg rounded-t-none rounded-b-xl py-2"
            : ""
        }`}
      >
        {/* LOGO */}
        <Link className="hidden md:block col-span-2 " href="/">
          <Image
            src="/logo.png"
            alt="logo"
            className="object-cover mx-auto"
            height={68}
            width={68}
          />
        </Link>

        <div className="grow md:px-4 px-2 gc8 col-span-6">
          <div
            className={`flex gap-3 justify-between w-full md:justify-center items-center transition-all ${
              scrollY > 0 && hasSearch
                ? "scale-0 -translate-y-[100%] h-0"
                : "mb-2"
            }`}
          >
            {hasNav && <NavButtons />}
            <div className="md:hidden">
              {/* {false ? <UserMenuPopover user={null} /> : <LoginButton />} */}
              <LoginButton />
            </div>
          </div>

          {hasSearch && <SearchInput />}
        </div>

        {/* LOGIN BUTTON AND ACTION */}
        <div className="flex gap-2 col-span-2">
          <Button
            variant={"secondary"}
            onClick={handleCreateMotel}
            className="hidden lg:flex border-main-yellow text-main-yellow bg-main-yellow-t9 hover:bg-main-yellow-t6 transition-all hover:border-main-yellow hover:border-2 border-2"
          >
            <HousePlusIcon size={20} className="mr-3"></HousePlusIcon> Đăng trọ
          </Button>
          <div className="flex gap-3 item-center">
            {/* <div className="lg:flex hidden ">
              <Select onValueChange={changeLanguage}>
                <SelectTrigger className="w-[100px] text-sm">
                  <LanguagesIcon className="size-4 " />
                  ${t(
                    "common.button.language"
                  )} 
                  {`(${i18n.language.toUpperCase()}) `}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="vi">Vietnamese</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            <div className="hidden md:block">
              {/* {user && Object.keys(user).length > 0 ? (
                <UserMenuPopover user={user} />
              ) : (
                <LoginButton />
              )} */}
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
