"use client";
import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { UserRole } from "@/lib/auth";

export default function RegisterForm() {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedRole, setSelectedRole] = useState<UserRole>("employer");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.email || !formData.username || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await register(
        formData.email,
        formData.username,
        formData.password,
        selectedRole,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl font-bold mb-2">Create an account</h1>
      <p className="text-gray-600 mb-8">Enter your details to get started</p>

      {/* Role Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          I am registering as:
        </label>
        <div className="space-y-3">
          {["employer", "admin", "candidate"].map((role) => (
            <label key={role} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="role"
                value={role}
                checked={selectedRole === role}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3 text-gray-700 capitalize">{role}</span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        {/* Username */}
        <div className="relative">
          <input
            type="text"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <User className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-center text-gray-600 mt-6">
        Already have an account?{" "}
        <a
          href="/auth/login"
          className="text-blue-600 font-medium hover:underline"
        >
          Sign in
        </a>
      </p>
    </div>
  );
}
