import React from "react";
import { twJoin } from "tailwind-merge";

interface AppHeading {
    content: string;
    classname?: string;
    onClick?: () => void;
}

function Heading({ content, classname, onClick }: AppHeading): React.ReactNode {
    return (
        <div
            className={twJoin(
                "text-black text-medium font-extrabold w-fit capitalize",
                classname ?? ""
            )}
            onClick={onClick}
        >
            {content}
        </div>
    );
}

export default Heading;
