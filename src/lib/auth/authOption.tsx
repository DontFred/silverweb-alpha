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
                if(!credentials || !credentials.email || !credentials.secret) return null

                const user = await trpc.checkWebAuthN({email: credentials.email, secret: credentials.secret})

                if(user) return {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  avatar: user.avatar,
                  deptname: user.department.name,
                  color: user.color.color
                }

                return null
            }
          })
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        return {
          ...token,
          ...user,
        };
      },
        session: async ({ session, token, user }) => {
            session.user = token
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login-admin"
    }
}