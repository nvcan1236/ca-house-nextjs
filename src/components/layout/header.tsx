"use client";
import { HousePlusIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Header = () => {
  // const role = useAppSelector((state) => state.common.role);
  // const user = useAppSelector((state) => state.auth.user);
  // const dispatch = useAppDispatch();
  // const changeLanguage = (value: language) => {
  //   i18n.changeLanguage(value);
  // };
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

  // const handleCreateMotel = () => {
  //   if (!user || !user.id) {
  //     toast.warning("Vui lòng đăng nhập trước!!");
  //     return;
  //   }
  //   navigate("/register-motel");
  // };

  return (
    <header
      className={`container z-20 fixed left-1/2 -translate-x-1/2 ${
        scrollY > 0 ? "" : ""
      }`}
    >
      <div
        className={`md:px-10 flex items-center  py-4 md:gap-x-4 transition-all ${
          scrollY > 0
            ? "bg-background border shadow-lg rounded-t-none rounded-b-xl py-2"
            : ""
        }`}
      >
        <Link className="lg:w-[200px] cursor-pointer hidden md:block" href="/">
          <Image
            src="/logo.png"
            alt="logo"
            className="object-cover"
            width={68}
            height={68}
          />
        </Link>

        <div className="grow md:px-4 px-2 ">
          <div
            className={`flex gap-3 justify-between w-full md:justify-center items-center transition-all ${
              scrollY > 0 ? "scale-0 -translate-y-[100%] h-0" : "mb-2"
            }`}
          >
            <div
              className={`flex gap-4 p-2 border border-gray-300 rounded-xl  bg-gray-50 `}
            >
              {/* <Button
                className={`md:w-[120px] w-24 ${
                  role === "post" && "text-gray-500"
                }`}
                variant={role === "motel" ? "default" : "ghost"}
                onClick={() => {
                  dispatch(switchRole("motel"));
                }}
              >
                Trọ
              </Button>
              <Button
                className={`md:w-[120px] w-24 ${
                  role === "motel" && "text-gray-500"
                }`}
                variant={role === "post" ? "default" : "ghost"}
                onClick={() => {
                  dispatch(switchRole("post"));
                }}
              >
                Bài đăng
              </Button> */}
            </div>

            <div className="md:hidden">
              {/* {user && Object.keys(user).length > 0 ? (
                <UserMenuPopover user={user} />
              ) : (
                <LoginButton />
              )} */}
            </div>
          </div>

          <div className="md:h-[54px] h-[46px] flex w-full items-center gap-1 pl-4 pr-2 border rounded-full bg-background border-main-blue-s3">
            {/* <DrawerDialogFilter /> */}

            <Input
              placeholder="Địa chỉ trọ muốn tìm kiếm ..."
              className="flex-1 border-none bg-transparent"
              accept="enter"
            />

            <Button className="rounded-full" variant={"ghost"} size={"icon"}>
              <SearchIcon size={20} />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant={"secondary"}
            className="hidden lg:flex border-main-yellow text-main-yellow bg-main-yellow-t9 hover:bg-main-yellow-t6 transition-all hover:border-main-yellow hover:border-2"
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
