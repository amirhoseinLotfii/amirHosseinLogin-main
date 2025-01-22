import { authOption } from "@/auth";
import Button from "@/components/shared/Button";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOption);
  console.log(session);

  return (
    <div className="w-full h-full flex">
      <Button theme="Primary" link="/sign-up" classCustom="m-5">
        {session?.user.userName ? "ورود به پنل کاربری" : "ثبت نام"}
      </Button>
    </div>
  );
}
