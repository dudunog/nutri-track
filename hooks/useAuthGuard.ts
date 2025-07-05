import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/auth-context";

export function useAuthGuard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  return { user, isAuthenticated };
}
