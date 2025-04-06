import React, { useEffect } from "react";

import { useAppDispatch, useTypedSelector } from "../../store";
import {
  fetchLeads,
  fetchMgrs,
  fetchOrders,
  fetchReport,
  fetchStats,
} from "../../store/reducers/performance";
import Dashboard from "./Dashboard";
import MonthlyOrders from "./Monthly";
import WeeklyOrders from "./Weekly";

function HomePage(): React.ReactNode {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchMgrs());
    dispatch(fetchOrders());
    dispatch(fetchStats());
    dispatch(fetchReport());
  }, []);

  const { stats } = useTypedSelector((state) => state.analytics);

  return (
    <div className="p-[55px] max-sm:p-[15px]">
      <div className="flex flex-row max-lg:flex-col max-[425px]:items-start justify-start items-center gap-[35px] mb-[20px] ">
        <WeeklyOrders stats={stats.weekly} />
        <MonthlyOrders stats={stats.monthly} />
      </div>
      <div className="w-full max-md:w-fit">
        <Dashboard />
      </div>
    </div>
  );
}

export default HomePage;
