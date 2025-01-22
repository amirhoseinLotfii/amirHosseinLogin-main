/* eslint-disable @typescript-eslint/no-explicit-any */
import { HashPassword, verifyPassword } from "@/lib/hashedPassword";
import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "process";

export const authOption: NextAuthOptions = {
  providers: [
    // sign-up
    CredentialsProvider({
      name: "sign-up",
      id: "sign-up",
      credentials: {
        userName: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        firstName: { label: "firstName", type: "text" },
        lastName: { label: "lastName", type: "text" },
        email: { label: "email", type: "text" },
        phone: { label: "phone", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("خطا در ثبت نام");
        }

        // data
        const { userName, password, firstName, lastName, email, phone } =
          credentials;

        // check exists user
        const sameuser = await prisma.user.findFirst({
          where: {
            OR: [{ userName }, { email }, { phone }],
          },
        });

        if (sameuser) {
          throw new Error("کاربری با این مشخصات در حال حاظر وجود دارد ");
        }

        // hash password
        const hashingPassword = await HashPassword(password);
        if (!hashingPassword) throw new Error("مشکل در ثبت اطلاعت ضروری");

        // create user
        const user = await prisma.user.create({
          data: {
            userName,
            firstName,
            lastName,
            email,
            phone,
            hashedPassWord: hashingPassword,
          },
        });

        if (!user) throw new Error("مشکل در ثبت اطلاعات کاربر");

        const finalDatauser = {
          ...user,
          hashedPassWord: undefined,
        };

        return finalDatauser;
      },
    }),

    // login
    CredentialsProvider({
      name: "login",
      id: "login",
      credentials: {
        userName: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("خطا در ورود");
        }

        // data
        const { userName, password } = credentials;

        // check exists user
        const sameuser = await prisma.user.findFirst({
          where: { userName },
        });

        if (!sameuser) {
          throw new Error("کاربری با این نم کاربری پیدا نشد ");
        }

        // hash password
        const hashingPassword = await verifyPassword(
          password,
          sameuser.hashedPassWord
        );
        if (!hashingPassword)
          throw new Error("نامکاربری یا رمز ورود نادرست هست");

        const finalDatauser = {
          ...sameuser,
          hashedPassWord: undefined,
        };

        return finalDatauser;
      },
    }),
  ],

  //
  //
  //
  //

  session: {
    strategy: "jwt",
  },

  secret: env.NEXT_AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
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
    async session({ session, token }: { session: any; token: any }) {
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
