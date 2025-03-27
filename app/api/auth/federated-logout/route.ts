
import { getToken } from "next-auth/jwt"
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

async function handler(req: NextRequest) {
    try {
        const token = await getToken({ req });
        const endsessionURL = `https://${process.env.OKTA_ISSUER}/v1/logout?id_token_hint=${token?.idToken}&post_logout_redirect_uri=${process.env.NEXT_AUTH_LOGOUT_ROUTE}`
        return redirect(`${endsessionURL}`)
    } catch (error) {
        return redirect(`${process.env.NEXT_AUTH_LOGOUT_ROUTE}`)
    }
}

export { handler as GET }