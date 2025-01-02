import React from "react";
import { twMerge } from "tailwind-merge";

interface AppLogo {
    src: string;
    width: number;
    height: number;
    classname?: string;
}

function Logo({ src, width, height, classname }: AppLogo): React.ReactNode {
    return (
        <img src={src} alt="avatar" width={width} height={height} className={twMerge(classname)} />
    );
}

export default Logo;
