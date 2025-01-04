import React from "react";

import created from "../../../assets/created.svg";
import waiting from "../../../assets/waiting.svg";

interface AppStepper {
    status?: boolean;
    closed_on?: string;
    approved_on?: string;
}

function CustomStepper({ closed_on, approved_on }: AppStepper): React.ReactNode {
    return (
        <div className="mx-auto w-fit flex justify-center items-center mb-8">
            <div className="flex flex-col items-center gap-[10px] relative">
                <img src={created} alt="created" />
                <div className="absolute mt-[38px] text-medium">Created</div>
            </div>
            <div
                className={`w-[150px] h-[0.5px] border-grey border-t-2 ${
                    closed_on === null ? "border-light-gray border-dashed" : "border-black"
                }`}
            ></div>
            <div className="flex flex-col items-center gap-[10px] relative">
                <img src={closed_on === null ? waiting : created} alt="waiting" />
                <div className="absolute mt-[38px] text-medium">Authorized</div>
            </div>
            <div
                className={`w-[150px] h-[0.5px] border-grey border-t-2 ${
                    closed_on === null ? "border-light-gray border-dashed" : "border-black"
                }`}
            ></div>
            <div className="flex flex-col items-center gap-[10px] relative">
                <img
                    src={closed_on === null && approved_on === null ? waiting : created}
                    alt="waiting"
                />
                <div className="absolute mt-[38px] text-medium">Approved</div>
            </div>
        </div>
    );
}

export default CustomStepper;
