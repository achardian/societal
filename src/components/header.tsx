"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { ModeToggle } from "./mode-toggle";
import useMenuBtnStore from "@/store/menu-btn-store";
import ProfileImg from "./profile-img";
import { cn } from "@/lib/utils";

const Header = () => {
  const { setIsOpen, isOpen } = useMenuBtnStore();
  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const arrayPathname = pathname.split("/");
  const isFollowing = searchParams.get("following_feed");

  const getTitle = () => {
    if (pathname === "/") {
      return "Home";
    } else if (pathname.includes("/edit-post")) {
      return "Edit Post";
    } else if (arrayPathname.includes("profile")) {
      return arrayPathname[1];
    } else if (arrayPathname.length === 3) {
      return `${arrayPathname[1]} ${arrayPathname[2]}`;
    } else {
      return arrayPathname[1];
    }
  };

  const title = getTitle();

  return (
    <header className="flex flex-col sticky top-0 bg-background/70 backdrop-blur-sm z-50">
      <div className="h-[60px] w-full border-b px-3 flex items-center justify-between ">
        <h1 className="text-2xl font-bold capitalize">{getTitle()}</h1>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link
            href={`/profile/${session?.user.username}`}
            className="block lg:hidden"
          >
            <ProfileImg
              src={session?.user.image as string}
              className="h-8 w-8"
            />
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="flex lg:hidden">
            <MenuIcon />
          </button>
        </div>
      </div>
      {pathname === "/" && (
        <div className="w-full flex items-center border-b">
          <Link
            href="/"
            className={cn(
              "flex-1 py-2 text-center",
              !isFollowing && "border-b-4 border-blue-600"
            )}
          >
            For You
          </Link>
          <Link
            href="/?following_feed=true"
            className={cn(
              "flex-1 py-2 text-center",
              isFollowing && "border-b-4 border-blue-600"
            )}
          >
            Following
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
