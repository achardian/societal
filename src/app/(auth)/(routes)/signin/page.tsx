import Link from "next/link";

import GoogleBtn from "@/components/google-btn";
import LoginForm from "@/components/forms/login-form";

const SignInPage = () => {
  return (
    <div className="p-10 flex flex-col justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Sign in to your account</h1>
      <LoginForm />
      <small>
        Do not have an account?{" "}
        <Link href="/signup" className="underline">
          Sign Up
        </Link>
      </small>
      <GoogleBtn />
    </div>
  );
};

export default SignInPage;
