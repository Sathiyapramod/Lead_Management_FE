import React, { useEffect } from "react";
import { useTypedSelector, useAppDispatch } from "../../store";
import {
    fetchLeads,
    fetchMgrs,
    fetchOrders,
    fetchReport,
    fetchStats,
} from "../../store/reducers/performance";
import WeeklyOrders from "./Weekly";
import MonthlyOrders from "./Monthly";
import { BasicStats } from "./Weekly";
import Dashboard from "./Dashboard";

export interface PerfStats {
    weekly: BasicStats;
    monthly: BasicStats;
}

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
        <div className="p-[55px]">
            <div className="flex justify-start items-center gap-[35px] mb-[20px]">
                <WeeklyOrders stats={stats.weekly} />
                <MonthlyOrders stats={stats.monthly} />
            </div>
            <div className="w-full">
                <Dashboard />
            </div>
        </div>
    );
}

export default HomePage;
