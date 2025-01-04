import React from "react";
import { twJoin } from "tailwind-merge";

interface AppChip {
    content: string;
    classname?: string;
    tag: boolean;
    count?: string;
}

function CustomChip({ content, classname, tag, count }: AppChip): React.ReactNode {
    return (
        <div
            className={twJoin(
                `w-fit h-auto rounded-lg text-center px-6 ${
                    tag ? "bg-green text-darkgreen" : "bg-orange text-darkorange"
                } text-center font-bold text-[12px] p-[8px]`,
                classname
            )}
        >
            {content}&nbsp;→&nbsp;${count}
        </div>
    );
}

export default CustomChip;
