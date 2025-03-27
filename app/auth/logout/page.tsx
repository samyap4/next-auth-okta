'use client'

import {signOut} from "next-auth/react";
import {useEffect} from "react";

export default function Page() {
    useEffect(() => {
        window.location.href = `https://next-auth-okta-chi.vercel.app/auth/signout`;
    }, []);

    return <p>Logging out...</p>;
}