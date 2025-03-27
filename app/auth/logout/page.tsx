'use client'

import {signOut} from "next-auth/react";
import {useEffect} from "react";
import { logout } from "../actions/logout-action";

export default function Page() {
    useEffect(() => {
         // window.location.href = `https://next-auth-okta-chi.vercel.app/auth/signout`;
         async function callLogOutAction() {
            await logout();
         }
         callLogOutAction();         
    }, []);

    return <p>Logging out...</p>;
}