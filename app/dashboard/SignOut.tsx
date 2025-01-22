"use client";
import IconMap from "@/components/shared/IconMap";
import { signOut, useSession } from "next-auth/react";

function SignOut() {
  const { status } = useSession();

  return (
    <span onClick={() => signOut({ callbackUrl: "/dashboard" })}>
      {status === "loading" ? (
        <div className="w-8 h-8 border-4 border-t-4 border-violet-100 border-t-violet-400 rounded-full animate-spin"></div>
      ) : (
        <IconMap className="w-8 h-8 cursor-pointer" src="/icons/logout.svg" />
      )}
    </span>
  );
}

export default SignOut;
