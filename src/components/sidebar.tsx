"use client";

import { usePathname } from "next/navigation";
import { Home, LogOut, PenBox, Search, UserCog2 } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

import Logo from "./logo";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import useMenuBtnStore from "@/store/menu-btn-store";

const Sidebar = () => {
  const links = [
    {
      title: "Home",
      path: "/",
      icon: Home,
    },
    {
      title: "Create Post",
      path: "/create-post",
      icon: PenBox,
    },
    {
      title: "Search",
      path: "/search",
      icon: Search,
    },
    {
      title: "Profile Settings",
      path: "/profile/settings",
      icon: UserCog2,
    },
  ];

  const pathname = usePathname();
  const { isOpen } = useMenuBtnStore();

  return (
    <aside
      className={cn(
        "flex-1 border-x h-screen lg:sticky fixed top-0 flex flex-col gap-1 lg:translate-x-0 -translate-x-full duration-200 ease-in-out",
        isOpen
          ? "translate-x-0 z-50 bg-background w-[80%]"
          : "-translate-x-full"
      )}
    >
      <div className="h-[60px] flex items-center justify-center">
        <Logo />
      </div>

      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={cn(
            "text-xl flex items-center md:justify-center lg:justify-start gap-3 p-3 mx-3 font-semibold rounded-md hover:bg-blue-600 hover:text-white",
            pathname === link.path && "bg-blue-700 text-white"
          )}
        >
          <link.icon />
          <span className="md:hidden lg:block">{link.title}</span>
        </Link>
      ))}

      <Button
        onClick={() => signOut()}
        variant="destructive"
        className="mx-3 mt-auto mb-5 text-lg flex items-center gap-3"
      >
        <LogOut />
        <span>Sign Out</span>
      </Button>
    </aside>
  );
};

export default Sidebar;
