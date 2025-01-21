"use server";

import { hashPassword, verifyPassword } from "@/lib/hashedPassword";
import { SchemaLogin, SchemaSignUp } from "@/lib/zod";
import prisma from "@/prisma/client";

export async function SignUpUser(formData: {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phone: string;
}) {
  try {
    const validation = SchemaSignUp.safeParse(formData);

    if (!validation.success) {
      return { status: 400, message: "لطفا بعدا تلاش کنید.", user: null };
    }

    const existUser1 = await prisma.user.count({
      where: {
        email: formData.email,
      },
    });

    const existUser2 = await prisma.user.count({
      where: {
        phone: formData.phone,
      },
    });

    const existUser3 = await prisma.user.count({
      where: {
        userName: formData.userName,
      },
    });

    if (existUser1 > 0 ) {
      return { status: 400, message: "این ایمیل از قبل وجود دارد.", user: null };
    }
    if (existUser2 > 0 ) {
      return { status: 400, message: "این شماره تلفن از قبل وجود دارد.", user: null };
    }
    if (existUser3 > 0 ) {
      return { status: 400, message: "این نام کاربری از قبل وجود دارد.", user: null };
    }

    const hashedPass = await hashPassword(formData.password);

    const user = await prisma.user.create({
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        userName: formData.userName,
        phone: formData.phone,
        hashedPassWord: hashedPass,
      },
    });

    return {
      status: 201,
      message: "ثیت نام شدید.",
      user: { ...user, pass: formData.password },
    };
  } catch (error) {
    console.log(error);
    return { status: 400, message: "لطفا بعدا تلاش کنید.", user: null };
  }
}

export async function GetUser(formData: {
  userName: string;
  password: string;
}) {
  try {
    const validation = SchemaLogin.safeParse(formData);

    if (!validation.success) {
      return { status: 400, message: "لطفا بعدا تلاش کنید.", user: null };
    }

    const user = await prisma.user.findFirst({
      where: {
        userName: formData.userName,
      },
    });

    const verify = await verifyPassword(
      formData.password,
      user!.hashedPassWord
    );


    if (user && verify !== true) {
      return {
        status: 400,
        message: "رمز عبور یا نام کاربری اشتباه است.",
        user: null,
      };
    }

    return {
      status: 200,
      message: "وارد شدید.",
      user: { ...user, pass: formData.password },
    };
  } catch (error) {
    console.log(error);
    return { status: 400, message: "لطفا بعدا تلاش کنید.", user: null };
  }
}
