import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { auth } from "@/auth";

async function handler(req: NextRequest) {
    try {
        const session = await auth() as any;
        const endsessionURL = `https://${process.env.OKTA_ISSUER}/v1/logout?id_token_hint=${session?.idToken}&post_logout_redirect_uri=${process.env.NEXT_AUTH_LOGOUT_ROUTE}`
        return redirect(`${endsessionURL}`)
    } catch (error) {
        return redirect(`${process.env.NEXT_AUTH_LOGOUT_ROUTE}`)
    }
}

export { handler as GET }