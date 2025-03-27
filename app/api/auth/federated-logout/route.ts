
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    
    if (req.method === 'POST') {
        try {
            const token = await getToken({ req });
            // if (!token) {
            //   return res.redirect(process.env.NEXTAUTH_URL || '')
            // }
            
            const endsessionURL = `https://${process.env.OKTA_ISSUER}/v1/logout?id_token_hint=${token?.idToken}&post_logout_redirect_uri=${process.env.NEXT_AUTH_LOGOUT_ROUTE}`
            return NextResponse.redirect(`${endsessionURL}`)
          } catch (error) {
            // res.redirect(process.env.NEXTAUTH_URL)
          }
        }
}