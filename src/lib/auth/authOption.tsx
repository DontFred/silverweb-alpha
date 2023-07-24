import { prisma } from "@/server/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { trpc } from "../trpc/ssTRPC";

export const authOption: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
      },
    providers: [
        CredentialsProvider({
            name: 'WebAuthN',
            credentials: {
              email: { label: "Email", type: "text"},
              secret: { label: "Secret", type: "password" }
            },
            async authorize(credentials, req) {
                console.log("AuthOptions", credentials)
                if(!credentials || !credentials.email || !credentials.secret) return null

                const user = await trpc.checkWebAuthN({email: credentials.email, secret: credentials.secret})

                console.log(user)
                if(user) return {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  image: user.avatar
                }

                return null
            }
          })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login-admin"
    }
}