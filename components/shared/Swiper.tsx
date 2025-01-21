"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Pagination } from "swiper/modules";

interface SwiperProp {
  textPrimary: string;
  textSecondry?: string;
  image: string;
  widthImg: number;
}

function SwiperComponent({ slides }: { slides: SwiperProp[] }) {
  return (
    <Swiper
      className="h-full w-3/5"
      pagination={{
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className}"></span>`;
        },
      }}
      modules={[Pagination]}
    >
      {slides.map((slide) => (
        <SwiperSlide
          key={slide.textPrimary}
          className="w-full h-fit !flex flex-col justify-center items-center bg-violet-700 relative text-white"
        >
          <div>
            <h3 className="text-2xl font-semibold">{slide.textPrimary}</h3>
            {slide.textSecondry && (
              <h6 className="font-extralight text-lg mt-2">
                {slide.textSecondry}
              </h6>
            )}
          </div>

          <Image
            src={slide.image}
            alt={slide.textPrimary}
            width={slide.widthImg}
            height={500}
            className="mt-10"
          />
        </SwiperSlide>
      ))}
      <span
        className={`swiper-pagination mx-auto inset-0 !bottom-10 justify-center items-center flex `}
      ></span>
    </Swiper>
  );
}

export default SwiperComponent;
