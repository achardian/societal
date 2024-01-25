import Logo from "@/components/logo";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "@/lib/utils";
import { redirect } from "next/navigation";
import Illustration from "@/assets/social.svg";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (session?.user) redirect("/");

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 h-screen static md:sticky top-0 flex flex-col justify-center items-center bg-main text-white p-3">
        <div className="relative w-full h-[350px]">
          <Image
            src={Illustration}
            alt="social-illustration"
            fill
            className="object-contain"
          />
        </div>
        <Logo />
        <p className="italic text-md mt-3">
          Share Moments, Spark Movements, Unleashing the Power of Unity!
        </p>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default AuthLayout;
