import React from "react";

import Completed from "../../assets/Completed.svg";
import Pending from "../../assets/Pending.svg";
import Logo from "../Logo";

interface AppCustomCallCard {
    total: number;
    completed: number;
    pending: number;
}

function CustomCard({ total, completed, pending }: AppCustomCallCard): React.ReactNode {
    return (
        <div className="lg:w-[427px] md:w-full h-[177px] rounded-lg bg-white shadow-sm p-[30px] cursor-pointer max-md:w-full">
            <div className="flex flex-row justify-between items-start mb-[20px] w-full">
                <div className="visible max-md:hidden text-medium">Calls Scheduled for the day</div>
                <div className="text-[45px]">{total}</div>
            </div>
            <div className="flex justify-start items-center gap-[30px]">
                <div className="flex gap-[5px]">
                    <Logo src={Completed} width={20} height={20} />
                    <div className="visible max-md:hidden">Completed - </div>
                    {completed}
                </div>
                <div className="flex gap-[5px]">
                    <Logo src={Pending} width={20} height={20} />
                    <div className="visible max-md:hidden">Pending - </div>
                    {pending}
                </div>
            </div>
        </div>
    );
}

export default CustomCard;
