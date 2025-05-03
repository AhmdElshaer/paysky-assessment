"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Loader2 } from "lucide-react";

export default function AuthGuard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, _hasHydrated } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (_hasHydrated) {
      setIsCheckingAuth(false);
    }
  }, [_hasHydrated]);

  useEffect(() => {
    if (isCheckingAuth) return;

    const protectedRoutes = ["/checkout"];
    const authRoutes = ["/login", "/signup"];

    if (user) {
      if (authRoutes.some((route) => pathname.startsWith(route))) {
        router.replace("/");
      }
    } else {
      if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        router.replace("/login");
      }
    }
  }, [pathname, user, isCheckingAuth, router]);

  if (isCheckingAuth) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <Loader2
          height={50}
          width={50}
          className="animate-spin text-muted-foreground"
        />
        <span>Loading...</span>
      </div>
    );
  }

  return children;
}
