"use client";

import { loginAdmin } from "@/services/admin/auth/login";
import { LoginFormInputs } from "@/type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function AdminLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: LoginFormInputs) => loginAdmin(data),
    onSuccess: (data) => {
      console.log("Login success:", data);
      toast.success("Đăng nhập thành công", { duration: 4000 });
      document.cookie = `auth_token=${data.metadata}; path=/`;
      router.push("/admin");
    },
    onError: (error) => {
      toast.error("Đăng nhập thất bại", { duration: 4000 });
      console.log("Login error:", error);
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Email là bắt buộc" })}
          className="w-full p-2 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Mật khẩu là bắt buộc" })}
          className="w-full p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}
