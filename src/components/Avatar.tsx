import React from "react";
import { twMerge } from "tailwind-merge";

interface AppAvatar {
    src: string;
    classname?: string;
    onClick?: () => void;
}

function Avatar({ src, classname, onClick = () => {} }: AppAvatar): React.ReactNode {
    return src === "" ? (
        <div className="rounded-full bg-slate-400 w-[50px] h-[50px] opacity-50"></div>
    ) : (
        <img
            src={src}
            alt="avatar"
            className={twMerge("rounded-full w-[50px] h-[50px]", classname)}
            onClick={onClick}
        />
    );
}

export default Avatar;
