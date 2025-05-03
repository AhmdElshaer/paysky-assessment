"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import Loading from "@/components/layout/loading";

export default function AuthGuard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, _hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!_hasHydrated) return;

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
  }, [pathname, user, _hasHydrated, router]);

  if (!_hasHydrated) {
    return <Loading />;
  }

  return children;
}
