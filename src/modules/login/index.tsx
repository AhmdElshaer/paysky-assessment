"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import UseLoginForm from "./hooks/useLogin";
import { useAuthStore } from "@/stores/authStore";

export default function LoginPage() {
  const { register, onSubmit, errors, isLoading, isValid } = UseLoginForm();
  const { user, _hasHydrated } = useAuthStore();
  if (user || !_hasHydrated) {
    return null;
  }

  return (
    <main className="flex-1 container flex items-center justify-center px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-md w-full">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Enter your credentials to sign in to your account
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <input
              className="border-[1.5px] border-neutral-3 rounded-md w-full py-2 px-2 placeholder:text-sm placeholder:text-[#94A3B8] mb-1 h-[40px] text-primary-1 focus-visible:border-primary-1 transition-all duration-150 ease-in-out"
              placeholder="Username"
              type="text"
              disabled={isLoading}
              {...register("username", {
                required: "Please enter your username",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters long",
                },
              })}
            />
            {errors.username && (
              <p className="text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <input
              className="border-[1.5px] border-neutral-3 rounded-md w-full py-2 px-2 placeholder:text-sm placeholder:text-[#94A3B8] mb-1 h-[40px] text-primary-1 focus-visible:border-primary-1 transition-all duration-150 ease-in-out"
              placeholder="Enter your password"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              {...register("password", {
                required: "Please enter your password",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])[a-z0-9^_]{6,}$/,
                  message: "Password must be at least 6 characters long and contain at least one letter and one number",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading || !isValid}
            >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Demo login: <strong>mor_2314</strong> with password{" "}
            <strong>83r5^_</strong>
          </p>
        </div>
      </div>
    </main>
  );
}
