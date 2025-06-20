"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import NavButtons from "@/components/layout/nav-button"
import SearchInput from "@/components/search/search-input"

import Container from "./container"
import HeaderAction from "./header-action"

const Header = () => {
  const pathname = usePathname()
  const [scrollY, setScrollY] = useState(0)
  const scrollDown = scrollY > 0
  const hasSearch = ["/motels"].includes(pathname)
  const hasNav = ["/motels", "/posts"].includes(pathname)
  const hasLogo = !["/motels", "/posts"].includes(pathname)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={cn({
        "fixed left-1/2 top-0 -translate-x-1/2 w-full z-20": scrollDown,
      })}
    >
      <Container className="flex-1">
        <div
          className={`flex gap-4 lg:gap-8 justify-between items-center py-4 transition-all rounded-b-xl ${
            scrollDown
              ? "bg-background/80 border shadow-lg py-2 px-2 md:px-10 backdrop-blur-md"
              : ""
          }`}
        >
          {/* LOGO */}
          <Link
            className={cn("hidden md:block xl:w-1/6 min-w-[60px]", {
              block: hasLogo,
              hidden: !hasLogo,
            })}
            href="/motels"
          >
            <Image
              src="/logo.png"
              alt="logo"
              className="object-cover size-[60px]"
              height={68}
              width={68}
              priority
            />
          </Link>

          <div className="md:px-4 flex-1 space-y-2 items-center">
            <div
              className={`flex items-center justify-between md:justify-center gap-3 w-full transition-all ${
                scrollDown && hasSearch ? "scale-0 -translate-y-[100%] h-0" : ""
              }`}
            >
              {hasNav && <NavButtons />}
              <div className="lg:hidden ml-auto">
                <HeaderAction />
              </div>
            </div>

            {hasSearch && <SearchInput />}
          </div>

          {/* ACTION */}
          <div className="hidden lg:block">
            <HeaderAction />
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
