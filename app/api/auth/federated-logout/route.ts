import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

async function handler(req: NextRequest) {
    console.log('starting federated handler');
    try {
        const session = await auth();
        console.log('session', session);
        const endsessionURL = `https://${process.env.OKTA_ISSUER}/v1/logout?id_token_hint=${session?.idToken}&post_logout_redirect_uri=${process.env.NEXT_AUTH_LOGOUT_ROUTE}`
        return NextResponse.redirect(`${endsessionURL}`)
    } catch (error) {
        console.log('error', error);
        return NextResponse.redirect(`${process.env.NEXT_AUTH_LOGOUT_ROUTE}`)
    }
}

export { handler as GET }


