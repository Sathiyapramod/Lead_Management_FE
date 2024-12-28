import React from "react";
import { twJoin } from "tailwind-merge";

interface AppHeading {
    content: string;
    classname?: string;
    onClick?: () => void;
}

function Heading({ content, classname, onClick }: AppHeading) {
    return (
        <div
            className={twJoin("text-black text-medium font-extrabold w-fit", classname ?? "")}
            onClick={onClick}
        >
            {content}
        </div>
    );
}

export default Heading;
