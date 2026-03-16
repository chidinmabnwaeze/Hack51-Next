import animation from "../../../public/cubes-human-resources-department-hiring-employee 1.png";
import Image from "next/image";
import LoginForm from "@/components/forms/LoginForm";

export default function Login() {
  return (
    <main className="m-32 flex justify-between">
      <section>
        <h1 className="text-4xl font-bold mb-4">Hack 51</h1>
        <p className="text-lg text-gray-600">
          Sign in to access your account and manage your work.
        </p>
        {/* <Image src={animation} alt=""></Image> */}
      </section>
      <section>
        <LoginForm />
      </section>
    </main>
  );
}
