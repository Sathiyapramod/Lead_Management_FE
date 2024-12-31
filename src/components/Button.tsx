import React from "react";
import { twMerge } from "tailwind-merge";

interface AppButton {
    theme: string;
    content: string;
    classname?: string;
    type?: "button" | "submit" | "reset";
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
    disabled?: boolean;
    src?: string;
}

function Button({ theme, content, onClick, classname, type, src, disabled }: AppButton) {
    return (
        <button
            onClick={onClick}
            type={type ?? "button"}
            className={twMerge(
                "lg:w-fit h-[48px] px-[16px] py-[5px] text-xs font-bold rounded-lg border border-black",
                theme === "dark" ? "bg-black text-white" : "bg-white text-black",
                classname
            )}
            disabled={disabled}
        >
            {content !== "" ? (
                content.toUpperCase()
            ) : (
                <img src={src} alt={"call_image"} width={35} height={35} />
            )}
        </button>
    );
}

export default Button;
