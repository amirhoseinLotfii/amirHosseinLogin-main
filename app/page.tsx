import Button from "@/components/shared/Button";

export default function Home() {
  return (
    <div className="w-full h-full flex">
      <Button theme="Primary" link="/sign-up" classCustom="m-5">
        ثبت نام
      </Button>
    </div>
  );
}
