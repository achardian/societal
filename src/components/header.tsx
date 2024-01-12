"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { ModeToggle } from "./mode-toggle";
import useMenuBtnStore from "@/store/menu-btn-store";
import ProfileImg from "./profile-img";

const Header = () => {
  const { setIsOpen, isOpen } = useMenuBtnStore();
  const { data: session } = useSession();
  const pathname = usePathname();
  const title =
    pathname === "/"
      ? "Home"
      : pathname.slice(1, pathname.length).split("-").join(" ");

  return (
    <header className="h-[60px] w-full border-b px-3 flex items-center justify-between sticky top-0 bg-background/70 backdrop-blur-sm z-50">
      <h1 className="text-2xl font-bold capitalize">{title}</h1>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Link
          href={`/profile/${session?.user.username}`}
          className="block lg:hidden"
        >
          <ProfileImg src={session?.user.image as string} className="h-8 w-8" />
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="flex lg:hidden">
          <MenuIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
