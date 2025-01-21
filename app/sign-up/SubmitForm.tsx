"use client";
import React, { useState } from "react";
import Button from "../../components/shared/Button";
import TextForForm from "../../components/shared/TextForForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SchemaSignUp } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../../components/shared/ErrorMessage";
import IconMap from "../../components/shared/IconMap";
import { SignUpUser } from "../actions/user";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

type SignUpType = z.infer<typeof SchemaSignUp>;

function SubmitForm() {
  const [showPass, setShowPass] = useState(false);
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
  } = useForm<SignUpType>({
    resolver: zodResolver(SchemaSignUp),
  });

  const submitFormSignUp = async (e: {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    const signUp = await SignUpUser(e);

    // await Sign Up
    if (signUp.status == 400) {
      toast.warning(signUp.message);
    } else {
      toast.done(signUp.message);
    }

    if (signUp.status == 201) {
      await signIn("credentials", {
        userName: signUp.user!.userName,
        hashedPassword: signUp.user?.hashedPassWord,
        password: signUp.user?.pass,
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-6">
      <h4 className="w-2/5 text-lg font-medium">ساخت حساب کاربری جدید!</h4>
      <form
        className="flex flex-col w-full items-center"
        onSubmit={handleSubmitSignUp(submitFormSignUp)}
      >
        <input
          type="text"
          id="firstName"
          {...registerSignUp("firstName")}
          className="bg-white focus:border-purple-500 mt-2 p-2 border-b-2 w-2/5 border-b-gray-300 outline-none font-thin"
          placeholder="نام"
        />
        <ErrorMessage forInput={errorsSignUp.firstName} />

        <input
          type="text"
          id="lastName"
          {...registerSignUp("lastName")}
          className="bg-white focus:border-purple-500 mt-2 p-2 border-b-2 w-2/5 border-b-gray-300 outline-none font-thin"
          placeholder="نام خانوادگی"
        />
        <ErrorMessage forInput={errorsSignUp.lastName} />

        <input
          type="text"
          id="userName"
          {...registerSignUp("userName")}
          className="bg-white focus:border-purple-500 mt-2 p-2 border-b-2 w-2/5 border-b-gray-300 outline-none font-thin"
          placeholder="نام کاربری"
        />
        <ErrorMessage forInput={errorsSignUp.userName} />

        <div className="border-b-2 w-2/5 border-b-gray-300 bg-white flex justify-between items-center focus-within:border-purple-500 mt-2 ">
          <input
            type={showPass ? "text" : "password"}
            id="password"
            {...registerSignUp("password")}
            className="p-2 outline-none font-thin w-full"
            placeholder="کلمه عبور"
          />
          <span onClick={() => setShowPass((prev) => !prev)}>
            <IconMap
              className="w-5 h-5"
              src={
                showPass
                  ? "/icons/eye-password-show.svg"
                  : "/icons/eye-password-hide.svg"
              }
            />
          </span>
        </div>
        <ErrorMessage forInput={errorsSignUp.password} />

        <input
          type="text"
          id="email"
          {...registerSignUp("email")}
          className="bg-white focus:border-purple-500 mt-2 p-2 border-b-2 w-2/5 border-b-gray-300 outline-none font-thin"
          placeholder="ایمیل"
        />
        <ErrorMessage forInput={errorsSignUp.email} />

        <input
          type="text"
          id="phone"
          {...registerSignUp("phone")}
          className="bg-white focus:border-purple-500 mt-2 p-2 border-b-2 w-2/5 border-b-gray-300 outline-none font-thin"
          placeholder="شماره تماس"
        />
        <ErrorMessage forInput={errorsSignUp.phone} />

        <Button theme="Primary">ثبت نام!!</Button>
      </form>
      <TextForForm>آیا حساب کاربری دارید؟</TextForForm>
      <Button theme="Secondry" link="/login">ورود!!</Button>
    </div>
  );
}

export default SubmitForm;
