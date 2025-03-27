"use server"
import { signOut } from "auth";

export default async function Logout() {
    const result = await signOutOfNextAuth();

    return <p>Logging out...</p>;
}

async function signOutOfNextAuth() {
    'use server'
    await signOut();
  }