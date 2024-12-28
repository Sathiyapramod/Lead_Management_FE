import React from "react";
import StatusChip from "./StatusChip";

function Card() {
    return (
        <div className="w-[255px] h-[177px] rounded-lg bg-white shadow-sm p-[30px] cursor-pointer">
            <div className="flex flex-row justify-between items-start mb-[20px]">
                <div className="text-medium">Leads</div>
                <div className="text-[45px]">80</div>
            </div>
            <div className="flex flex-row justify-between items-center">
                <StatusChip content="Active" tag={true} count={45} />
                <StatusChip content="Pending" tag={false} count={30} />
            </div>
        </div>
    );
}

export default Card;
