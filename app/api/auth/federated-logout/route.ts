
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const token = await getToken({ req });
        const endsessionURL = `https://${process.env.OKTA_ISSUER}/v1/logout?id_token_hint=${token?.idToken}&post_logout_redirect_uri=${process.env.NEXT_AUTH_LOGOUT_ROUTE}`
        NextResponse.redirect(`${endsessionURL}`)
    } catch (error) {
        NextResponse.redirect(`${process.env.NEXT_AUTH_LOGOUT_ROUTE}`)
    }
}