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
        router.push('/'); // Navigate to home route on success
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }

    handleLogout(); // Trigger logout on mount
  }, [router]); // Run only once on mount

  return <p>Logging out...</p>;
}