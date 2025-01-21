import Image from "next/image";
import React, { ComponentProps } from "react";

interface IconType {
  src: string;
  className: ComponentProps<"div">["className"];
}

function IconMap({ className, src }: IconType) {
  return (
    <div className={`relative ${className}`}>
      <Image src={src} fill alt="icon" />
    </div>
  );
}

export default IconMap;
