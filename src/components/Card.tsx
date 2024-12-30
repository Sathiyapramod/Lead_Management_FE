import React from "react";
import StatusChip from "./StatusChip";

interface AppCard {
    title: string;
    count: number;
    active: number;
    pending: number;
}

function Card({ title, count, active, pending }: AppCard) {
    return (
        <div className="w-[255px] h-[177px] rounded-lg bg-white shadow-sm p-[30px] cursor-pointer">
            <div className="flex flex-row justify-between items-start mb-[20px]">
                <div className="text-medium">{title}</div>
                <div className="text-[45px]">{count ?? 0}</div>
            </div>
            <div className="flex flex-row justify-between items-center">
                <StatusChip content="Active" tag={true} count={active ?? 0} />
                <StatusChip content="Pending" tag={false} count={pending ?? 0} />
            </div>
        </div>
    );
}

export default Card;
