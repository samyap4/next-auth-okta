'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logout } from "../actions/logout-action";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleLogout() {
      try {
        await logout(); // Call server action
      } catch (error) {
        // @ts-ignore
        if (error.message !== "NEXT_REDIRECT") {
          console.error("Logout failed:", error);
        }
      } finally {
        router.push('/'); // Always navigate to home route
      }
    }

    handleLogout(); // Trigger logout on mount
  }, [router]);

  return <p>Logging out...</p>;
}