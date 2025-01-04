import React from "react";
import { twJoin } from "tailwind-merge";

import location from "../assets/location.svg";

interface AppChip {
    content: string;
    classname?: string;
}

function Chip({ classname, content }: AppChip): React.ReactNode {
    return (
        <div
            className={twJoin(
                "text-black text-small h-[50px] bg-white rounded-lg shadow-sm px-3 flex flex-row justify-center gap-[5px] items-center",
                classname ?? ""
            )}
        >
            <img src={location} alt="current_time_zone" />
            {content}
        </div>
    );
}

export default Chip;
