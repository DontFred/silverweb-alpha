import { prisma } from "@/server/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOption: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "database",
        maxAge: 7 * 24 * 60 * 60,
      },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'WebAuthN',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              email: { label: "Email", type: "text"},
              secret: { label: "Secret", type: "password" }
            },
            async authorize(credentials, req) {
                if(!credentials || !credentials.email || !credentials.secret) return null
        
              // If no error and we have user data, return it
              return {
                email: credentials.email,
                name: credentials.email,
                id: "1234",
              }
              // Return null if user data could not be retrieved
              return null
            }
          })
    ]
}