import Link from "next/link";
import { Agbalumo } from "next/font/google";
import { cn } from "@/lib/utils";

const logoFont = Agbalumo({ subsets: ["vietnamese"], weight: "400" });

const Logo = () => {
  return (
    <Link href="/">
      <span className={cn(logoFont.className, "text-4xl text-logo")}>
        Societal
      </span>
    </Link>
  );
};

export default Logo;
