"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import toast from "react-hot-toast";

interface IFormInput {
  username: string;
  password: string;
}

export default function UseLoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: "onChange",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data.username, data.password);
      toast.success("Logged in successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    isLoading,
    onSubmit,
  };
}