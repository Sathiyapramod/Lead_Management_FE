import React from "react";

import CustomChip from "../../components/custom/Chip/CustomChip";
import formatAmt from "../../utils/formatAmount";
import { BasicStats } from "./HomePage.types";

function MonthlyOrders({ stats }: { stats: BasicStats }): React.ReactNode {
  return (
    <div className="w-1/2 h-[177px] max-lg:h-fit rounded-lg bg-white shadow-sm p-[30px] cursor-pointer">
      <div className="flex flex-row justify-between items-start mb-[20px]">
        <div className="text-medium max-md:hidden">Monthly Orders</div>
        <div className="text-[45px] max-md:text-medium max-lg:font-bold">
          {formatAmt(stats.count)}
        </div>
      </div>
      <div className="flex flex-row max-lg:flex-col max-lg:gap-[15px] justify-between items-center">
        <CustomChip
          content={"Completed"}
          tag={true}
          count={formatAmt(stats.closed)}
        />
        <CustomChip
          content={"Pending"}
          tag={false}
          count={formatAmt(stats.pending)}
        />
      </div>
    </div>
  );
}

export default MonthlyOrders;
