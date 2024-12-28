import React from "react";
import { twJoin } from "tailwind-merge";

interface AppChip {
    content: string;
    classname?: string;
    tag: boolean;
    count?: number;
}

function StatusChip({ content, classname, tag, count }: AppChip) {
    return (
        <div
            className={twJoin(
                `w-f h-auto rounded-2xl text-center ${
                    tag ? "bg-green text-darkgreen" : "bg-orange text-darkorange"
                } text-center font-bold text-[12px] p-[8px]`,
                classname
            )}
        >
            {content}&nbsp;{count ? "→ " : null}
            {count}
        </div>
    );
}

export default StatusChip;
