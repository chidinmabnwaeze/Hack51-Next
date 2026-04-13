"use client";

import { useState } from "react";
import { userAuth } from "@/lib/context";
import { useRouter } from "next/navigation";

export default function Verification() {
  const verifyEmail = userAuth((state: any) => state.veifyEmail);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (value: number, index: number) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    //move to next input
    if (index < 5 && value) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try{
      const otpCode = otp.join("");
      console.log("Verifying OTP:", otpCode);
      verifyEmail({ otp: otpCode });

    }catch(err){
      console.log("Verification error:", err);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Email Verification</h1>
      <p className="text-lg text-gray-600 mb-6">
        Please check your email for a verification link.
      </p>
      <p className="text-gray-600">
        If you haven't received the email, please check your spam folder or{" "}
        <a href="#" className="text-[#FF0046] font-medium hover:underline">
          resend the verification email
        </a>
        .
      </p>

      <form action="" className="flex justify-center mt-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            className="w-10 h-10 text-center border border-gray-300 rounded-md mx-1 focus:outline-none focus:ring-2 focus:ring-[#FF0046] focus:border-transparent"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(Number(e.target.value[0]), index)}
          />
        ))}
      </form>

      <div className="mt-6">
        <button
          className="px-4 py-2 bg-[#FF0046] text-white rounded-lg font-medium hover:bg-red-700"
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Otp"}
        </button>
      </div>
      <div className="mt-4">
        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400">
          {" "}
          Back to Login
        </button>
      </div>
    </div>
  );
}
