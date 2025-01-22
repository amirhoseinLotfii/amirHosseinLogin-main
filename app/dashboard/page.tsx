import { convertNumberEnglishToPersian } from "@/lib/convertNumberEnglishToPersian";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import SignOut from "./SignOut";
import { authOption } from "@/auth";

async function page() {
  const session = await getServerSession(authOption);
  if (!session?.user) {
    return <div>Unable to load user data</div>;
  }
  return (
    <div className="w-screen h-screen flex">
      <div className="h-full w-1/12 relative flex flex-col justify-between items-center py-8">
        <Image
          src={"/images/profile.png"}
          alt="profile"
          width={100}
          height={100}
        />
        <SignOut />
      </div>

      <div className="w-11/12 h-full bg-violet-700 text-white pt-10 pr-16">
        <h2 className="text-3xl">اطلاعات کاربری</h2>
        <ul className="mt-8 !space-y-5">
          <li>
            <span>نام:</span> <span>{session.user.firstName}</span>
          </li>
          <li>
            <span>نام خانوادگی:</span> <span>{session.user.lastName}</span>
          </li>
          <li>
            <span>نام کاربری:</span> <span>{session.user.userName}</span>
          </li>
          <li>
            <span>ایمیل:</span> <span>{session.user.email}</span>
          </li>
          <li>
            <span>تلفن:</span>{" "}
            <span>
              {convertNumberEnglishToPersian(session.user.phone as string)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default page;
