import { signOut } from "auth";
import { useEffect } from "react";

export default async function Logout() {
    const result = await signOut();

    return <p>Logging out...</p>;
}