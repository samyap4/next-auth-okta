import NextAuth from "next-auth"
import "next-auth/jwt"

import Okta from "next-auth/providers/okta"


export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  providers: [
    Okta({
      clientId: process.env.OKTA_CLIENT_ID,
      clientSecret: process.env.OKTA_CLIENT_SECRET,
      issuer: process.env.OKTA_ISSUER,
      authorization: { 
        params: { 
          scope: "openid email profile offline_access" 
        } 
      }
    })
  ],
  basePath: "/auth",
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    async jwt({ token, account }: any) {
      if (account) {
          token.accessToken = account.access_token;
          token.idToken = account.id_token;
          token.oktaId = account.providerAccountId;
          token.refreshToken = account.refresh_token;
      }
    
      var tokenParsed = JSON.parse(Buffer.from(token.idToken.split('.')[1], 'base64').toString());
      const dateNowInSeconds = new Date().getTime() / 1000
      const tokenIsNotExpired = dateNowInSeconds < tokenParsed.exp;
      if (tokenIsNotExpired) {
          return token;
      } else {
          const url = `${process.env.OKTA_DOMAIN}/v1/token`;
          const body = `grant_type=refresh_token&client_id=${process.env.OKTA_CLIENT_ID}&client_secret=${process.env.OKTA_CLIENT_SECRET}&refresh_token=${token.refreshToken}`;
          const headers = {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
          };
          const response = await fetch(url, { method: 'POST', body, headers });
          const data = await response.json();
          if (data.error) {
              throw new Error("Unable to refresh token");
          }

          // Only need to refresh id/access token with new refresh token not oktaId since it's not returned
          if (data && data.success) {
              token.accessToken = data.access_token;
              token.idToken = data.id_token;
              token.refreshToken = data.refresh_token;
          }
          return token;
      }
    },
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken

      return session
    },
  },
  experimental: { enableWebAuthn: true },
})

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}
