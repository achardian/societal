"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const GoogleBtn = () => {
  return (
    <div className="my-6 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <small>Or Continue With</small>
        <Separator className="flex-1" />
      </div>
      <Button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        variant="secondary"
        className="w-full"
      >
        <Image
          src="/google-icon.svg"
          alt="google icon"
          width={25}
          height={25}
        />
        <span>Continue With Google</span>
      </Button>
    </div>
  );
};

export default GoogleBtn;
