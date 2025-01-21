"use client";
import React, { useState } from "react";
import Button from "../../components/shared/Button";
import TextForForm from "../../components/shared/TextForForm";
import IconMap from "../../components/shared/IconMap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SchemaLogin } from "@/lib/zod";
import ErrorMessage from "../../components/shared/ErrorMessage";
import { GetUser } from "../actions/user";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

type SignUpType = z.infer<typeof SchemaLogin>;

function LoginForm() {
  const [showPass, setShowPass] = useState(false);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm<SignUpType>({
    resolver: zodResolver(SchemaLogin),
  });

  const submitFormLogin = async (e: { userName: string; password: string }) => {
    const login = await GetUser(e);

    if (login.status == 200) {
      await toast.done(login.message)
      await signIn("credentials", {
        userName: login.user!.userName,
        hashedPassword: login.user?.hashedPassWord,
        password: login.user?.pass,
      });
    } else{
      toast.warning(login.message)
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center w-full items-center">
        <h2 className="font-bold text-5xl">کندا ایده</h2>
        <span className="font-thin text-lg mt-2">تجربه مهندسی خلاق</span>
      </div>
      <div className="w-full flex flex-col items-center mt-6">
        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmitLogin(submitFormLogin)}
        >
          <input
            type="text"
            id="userName"
            {...registerLogin("userName")}
            className="bg-white focus:border-purple-500 mt-10 p-2 border-b-2 w-2/5 border-b-gray-300 outline-none font-thin"
            placeholder="نام کاربری"
          />
          <ErrorMessage forInput={errorsLogin.userName} />

          <div className="border-b-2 w-2/5 border-b-gray-300 bg-white flex justify-between items-center focus-within:border-purple-500 mt-8 ">
            <input
              type={showPass ? "text" : "password"}
              id="password"
              {...registerLogin("password")}
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
          <ErrorMessage forInput={errorsLogin.password} />
          <span className="font-thin text-xs w-2/5 text-gray-500 flex justify-end mt-2 cursor-pointer">
            آیا نام کاربری یا کلمه عبور را فراموش کرده اید؟
          </span>

          <Button theme="Primary">ورود به سامانه</Button>
        </form>

        <TextForForm>آیا حساب کاربری ندارید؟</TextForForm>

        <Button theme="Secondry" classCustom="text-sm" link="/sign-up">
          ساخت حساب کاربری
        </Button>
      </div>
    </>
  );
}

export default LoginForm;
