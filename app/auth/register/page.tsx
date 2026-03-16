import animation from "../../../public/cubes-human-resources-department-hiring-employee 1.png";
import Image from "next/image";
import RegisterForm from "@/components/forms/RegisterForm";

export default function Register() {
  return (
    <main className="m-32 flex justify-between">
      <section>
        <h1 className="text-4xl font-bold mb-4">Hack 51</h1>
        <p className="text-lg text-gray-600">
          Join our platform to connect with talent or employers.
        </p>
        {/* <Image src={animation} alt=""></Image> */}
      </section>
      <section>
        <RegisterForm />
      </section>
    </main>
  );
}
