import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

export type NavItem = { to: string; label: string; icon: ReactNode };

const SidebarItem = ({ open, item }: { open: boolean; item: NavItem }) => {
  return (
    <Link
      href={item.to}
      className={cn("py-1.5 px-1 rounded-md font-medium inline-flex items-center",{
        "px-4 gap-2": open
      })}
      // className={({ isActive }) =>
      //   "py-1.5 px-4 rounded-md font-medium flex gap-2 items-center " +
      //   (!isActive
      //     ? "text-slate-600 hover:bg-main-blue-t8"
      //     : "shadow-md border bg-background text-main-blue-s3")
      // }
    >
      {item.icon} {open && item.label}
    </Link>
  );
};

export default SidebarItem;