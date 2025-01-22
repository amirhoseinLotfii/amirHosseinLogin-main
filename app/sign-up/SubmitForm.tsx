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
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { env } from "process";

type SignUpType = z.infer<typeof SchemaSignUp>;

function SubmitForm() {
  const [showPass, setShowPass] = useState(true);

  const router = useRouter();

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp, isSubmitting },
  } = useForm<SignUpType>({
    resolver: zodResolver(SchemaSignUp),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      phone: "",
    },
  });
  console.log(env.NODE_ENV);

  const submitFormSignUp = async (data: SignUpType) => {
    const res = await signIn("sign-up", {
      ...data,
      redirect: false,
    });

    console.log(res);

    if (!res?.ok) {
      return toast.warning(res?.error);
    } else {
      toast.success("ثبت نام موفقیت امیز بود");
      router.push("/dashboard");
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

        <div className="border-b-2 w-2/5 border-b-gray-300 bg-white flex justify-between items-center focus-within:border-purple-500 mt-2">
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

        <Button theme="Primary" loading={isSubmitting}>
          {isSubmitting ? "در حال ارسال..." : "ثبت نام!!"}
        </Button>
      </form>
      <TextForForm>آیا حساب کاربری دارید؟</TextForForm>
      <Button theme="Secondry" link="/login">
        ورود!!
      </Button>
    </div>
  );
}

export default SubmitForm;
