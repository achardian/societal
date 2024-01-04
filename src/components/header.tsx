"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { MenuIcon } from "lucide-react";

import { ModeToggle } from "./mode-toggle";
import useMenuBtnStore from "@/store/menu-btn-store";

const Header = () => {
  const { setIsOpen, isOpen } = useMenuBtnStore();
  const { data } = useSession();

  return (
    <header className="h-[60px] w-full border-b px-3 flex items-center justify-between sticky top-0 bg-background/70 backdrop-blur-sm">
      <h1 className="text-2xl font-bold">Home</h1>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Link
          href={`/profile/${data?.user.username}`}
          className="block lg:hidden"
        >
          <Image
            src={data?.user.image as string}
            alt="user-img"
            width={30}
            height={30}
            className="rounded-full"
          />
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="flex lg:hidden">
          <MenuIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
