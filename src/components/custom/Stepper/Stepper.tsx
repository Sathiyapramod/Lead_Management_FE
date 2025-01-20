import React from "react";

import created from "../../../assets/created.svg";
import waiting from "../../../assets/waiting.svg";

interface AppStepper {
    status?: boolean;
}

function Stepper({ status }: AppStepper): React.ReactNode {
    return (
        <div className="mx-auto w-fit flex justify-center items-center mb-8">
            <div className="flex flex-col items-center gap-[10px] relative">
                <img src={created} alt="created" />
                <div className="absolute mt-[38px] text-medium">Created</div>
            </div>
            <div
                className={`w-[150px] h-[0.5px] border-grey border-t-2 ${
                    status === false ? "border-light-gray border-dashed" : "border-black"
                }`}
            ></div>
            <div className="flex flex-col items-center gap-[10px] relative">
                <img src={status === false ? waiting : created} alt="waiting" />
                <div className="absolute mt-[38px] text-medium">
                    {status === false ? "Pending" : "Active"}
                </div>
            </div>
        </div>
    );
}

export default Stepper;
