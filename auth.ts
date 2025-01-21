import { verifyPassword } from "@/lib/hashedPassword";
import prisma from "@/prisma/client";
import NextAuth from "next-auth/next";
import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface UserLoginType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userName: string;
}


export const authOption: NextAuthOptions  = {
  providers: [
    //@ts-ignore
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials: Record<string, string> | undefined, req) {
        if (!credentials) {
          return null; // Return null if credentials are undefined
        }

        const { userName, hashedPassword, password } = credentials as {
          userName: string;
          hashedPassword: string;
          password: string;
        };

        const user: UserLoginType | null = await prisma.user.findFirst({
          where: { userName: userName },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            userName: true,
          },
        });

        const verify = await verifyPassword(password, hashedPassword);

        if (user && verify) {
          return user; // Return the user object if credentials are valid
        } else {
          return null; // Return null if credentials are invalid
        }
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: UserLoginType }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.userName = user.userName;
        token.phone = user.phone;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.userName = token.userName;
        session.user.phone = token.phone;
      }
      return session;
    },
  },
};
