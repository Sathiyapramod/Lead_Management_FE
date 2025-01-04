import React from "react";
import formatAmt from "../../helpers/formatAmount";
import CustomChip from "../../components/custom/Chip/CustomChip";
export interface BasicStats {
    count: number;
    closed: number;
    pending: number;
}

function WeeklyOrders({ stats }: { stats: BasicStats }): React.ReactNode {
    return (
        <div className="w-1/2 h-[177px] rounded-lg bg-white shadow-sm p-[30px] cursor-pointer">
            <div className="flex flex-row justify-between items-start mb-[20px]">
                <div className="text-medium">Weekly Orders</div>
                <div className="text-[45px]">{formatAmt(stats.count)}</div>
            </div>
            <div className="flex flex-row justify-between items-center">
                <CustomChip content={"Completed"} tag={true} count={formatAmt(stats.closed)} />
                <CustomChip content={"Pending"} tag={false} count={formatAmt(stats.pending)} />
            </div>
        </div>
    );
}

export default WeeklyOrders;
