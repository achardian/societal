import Logo from "@/components/logo";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 h-screen static md:sticky top-0 flex flex-col justify-center items-center bg-main text-white p-3">
        <div className="relative w-full h-[350px]">
          <Image
            src="/social.svg"
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
