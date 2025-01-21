import SwiperComponent from "@/components/shared/Swiper";
import { slides } from "@/lib/dataPublic";
import React from "react";
import SubmitForm from "./SubmitForm";

function page() {
  return (
    <div className="w-full h-full flex">
      <div className="w-2/5 h-full flex flex-col justify-center items-center">
        <SubmitForm />
      </div>
      <SwiperComponent slides={slides}/>
    </div>
  );
}

export default page;
