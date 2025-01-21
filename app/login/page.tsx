import SwiperComponent from "@/components/shared/Swiper";
import { slides } from "@/lib/dataPublic";
import React from "react";
import LoginForm from "./LoginForm";

function page() {
  return (
    <div className="w-full h-full flex">
      <div className="w-2/5 h-full flex flex-col justify-center items-center">
        <LoginForm />
      </div>

      <SwiperComponent slides={slides} />
    </div>
  );
}

export default page;
