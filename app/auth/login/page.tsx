import animation from "../../../public/cubes-human-resources-department-hiring-employee 1.png";
import Image from "next/image";
import LoginForm from "@/app/components/forms/LoginForm";

export default function Login() {
  return (
    <main className=" flex h-screen">
      <section className=" flex w-1/2 flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">
          Hack <span className="text-[#FF0046]">51</span>
        </h1>
        <p className="text-lg text-gray-600">
          Sign in to access your account and manage your work.
        </p>
        <Image src={animation} alt=""></Image>
      </section>
      <section className="bg-[#FF0046] w-1/2 flex justify-center items-center  ">
        <LoginForm />
      </section>
    </main>
  );
}
