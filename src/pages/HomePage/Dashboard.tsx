import React, { useState, useEffect } from "react";
import { PERF_HEADINGS } from "../../utils/constants";
import CustomTable from "../../components/custom/Table/CustomTable";
import { useAppDispatch, useTypedSelector } from "../../store";
import { fetchReport } from "../../store/reducers/performance";

export interface BaseReport {
    lead_name: string;
    rest_name: string;
    placed_on: string;
    approved_on: string;
    order_value: number;
}

interface PageReport {
    [key: string]: BaseReport[];
}

function Dashboard(): React.ReactNode {
    const dispatch = useAppDispatch();

    const [currTab, setCurrTab] = useState<string>("3Days");

    useEffect(() => {
        dispatch(fetchReport());
    }, []);

    const { report } = useTypedSelector((state) => state.analytics) as unknown as PageReport;

    const handleTab = (value: string) => setCurrTab(value);

    const COLOR_CODES: Record<string, string> = {
        "3Days": "text-darkgreen",
        "7Days": "text-blue-500",
        "14Days": "text-red-400",
    };

    return (
        <div className="rounded-lg bg-white shadow-sm w-full">
            <ol className="flex space-x-2">
                {Object.entries(PERF_HEADINGS).map(([key, value]) => (
                    <li
                        key={key}
                        onClick={() => handleTab(value)}
                        className={`px-2 py-1 cursor-pointer ${COLOR_CODES[value]}`}
                    >
                        {key}
                    </li>
                ))}
            </ol>
            <CustomTable columns={report[currTab]} />
        </div>
    );
}

export default Dashboard;
