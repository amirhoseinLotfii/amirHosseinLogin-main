"use client";
import { useRouter } from "next/navigation";
import React, { ComponentProps } from "react";

interface ButtonProp {
  children: string | React.ReactNode;
  classCustom?: ComponentProps<"button">["className"];
  theme: "Primary" | "Secondry";
  loading?: boolean;
  link?: string;
}
function Button({ children, classCustom, theme, loading, link }: ButtonProp) {
  const router = useRouter();
  return (
    <button
      className={`px-4 py-2 mt-6 text-white font-medium rounded-full transition-all duration-500 flex items-center justify-center ${
        theme == "Primary"
          ? " bg-violet-700"
          : "bg-violet-200 hover:bg-violet-700"
      } ${classCustom}`}
      onClick={() => link && router.push(link)}
    >
      {loading == true ? (
        <div className="w-8 h-8 border-4 border-t-4 border-violet-100 border-t-violet-400 rounded-full animate-spin"></div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
}

export default Button;
