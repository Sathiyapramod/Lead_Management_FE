import React from "react";
import { twMerge } from "tailwind-merge";

import StatusChip from "./custom/Chip/StatusChip";

interface AppCard {
    title: string;
    count: number;
    active: number;
    pending: number;
    activeTag: string;
    pendingTag: string;
    classname?: string;
}

function Card({
    title,
    count,
    active,
    pending,
    activeTag,
    pendingTag,
    classname,
}: AppCard): React.ReactNode {
    return (
        <div
            className={twMerge(
                "w-[300px] h-[177px] rounded-lg bg-white shadow-sm p-[30px] cursor-pointer",
                classname
            )}
        >
            <div className="flex flex-row justify-between items-start mb-[20px]">
                <div className="text-medium">{title}</div>
                <div className="text-[45px]">{count ?? 0}</div>
            </div>
            <div className="flex flex-row justify-between items-center">
                <StatusChip content={activeTag} tag={true} count={active} />
                <StatusChip content={pendingTag} tag={false} count={pending} />
            </div>
        </div>
    );
}

export default Card;
