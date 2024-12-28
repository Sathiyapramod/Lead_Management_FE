import React from "react";

interface AppAvatar {
    src: string;
}

function Avatar({ src }: AppAvatar) {
    return src === "" ? (
        <div className="rounded-full bg-slate-400 w-[50px] h-[50px] opacity-50"></div>
    ) : (
        <img src={src} alt="avatar" className="rounded-full w-[50px] h-[50px]" />
    );
}

export default Avatar;
