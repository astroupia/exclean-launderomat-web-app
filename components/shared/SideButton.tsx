import React from "react";
import Image, { StaticImageData } from "next/image";

export interface SideButtonProps {
  name: string;
  iconUrl: StaticImageData;
  variant?: "selected" | "not-selected";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const SideButton: React.FC<SideButtonProps> = ({
  name,
  iconUrl,
  variant,
  onClick,
  className,
}) => {
  return (
    <div className="cursorflex item-center justify-center px-5 max-w-9 my-5">
      <button className={`flex ${className}`} onClick={onClick}>
        <Image className="mx-2" width={30} height={30} src={iconUrl} alt=" " />
        <h3 className="hover:text-white font-bold text-indigo-600 mx-2">
          {name}
        </h3>
      </button>
    </div>
  );
};

export default SideButton;
