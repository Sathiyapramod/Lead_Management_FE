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
                `w-fit h-auto rounded-lg text-center px-6 max-lg:px-1 max-md:w-fit  font-bold text-[12px] p-[8px] max-md:p-0.5 ${
                    tag ? "bg-green text-darkgreen" : "bg-orange text-darkorange"
                } `,
                classname
            )}
        >
            <span className="visible inline max-[425px]:hidden ">{content}&nbsp;→&nbsp;</span>$
            {count}
        </div>
    );
}

export default CustomChip;
