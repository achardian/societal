import RegisterForm from "@/components/forms/register-form";
import GoogleBtn from "@/components/google-btn";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="p-10 flex flex-col justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Sign up new account</h1>
      <RegisterForm />
      <small>
        Have an account?{" "}
        <Link href="/signin" className="underline">
          Sign in
        </Link>
      </small>
      <GoogleBtn />
    </div>
  );
};

export default SignUpPage;
