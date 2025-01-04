import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import Heading from "../../components/Heading";
import Table from "../../components/custom/Table/Table";
import API from "../../services/api";
import { toast } from "sonner";
import SearchBar from "../../components/SearchBar";
import { BaseTable } from "../../components/custom/Table/Table";
import { MgrColumns } from "../../utils/constants";
import { title_headings } from "../../utils/headings";

export interface ManagersList {
    id: number;
    mgr_name: string;
    role: "manager" | "admin";
    phone: string;
    leads?: number;
}

interface Managers extends BaseTable {
    managers: ManagersList[];
}

function Manager(): React.ReactNode {
    const [searchName, setName] = useState<string>("");
    const [mgrs, setMgrs] = useState<Managers>({
        count: 0,
        active: 0,
        pending: 0,
        completed: 0,
        managers: [],
    });
    const [offset, setOffset] = useState<number>(0);

    const getList = async () => {
        try {
            const { data, status } = await API.getManagers({
                limit: "10",
                offset: String(offset),
                searchName,
            });
            if (status !== 200) {
                toast.error("Error while fetching the Leads");
            } else {
                setMgrs(data);
            }
        } catch (err) {
            console.log(err);
            toast.error("Error");
        }
    };

    useEffect(() => {
        getList();
    }, [offset, setName]);

    return (
        <div className="p-[55px]">
            <div className="flex justify-between items-start">
                <Card
                    title={title_headings.KAM}
                    count={mgrs?.count ?? 0}
                    active={mgrs?.active ?? 0}
                    pending={mgrs?.pending ?? 0}
                    activeTag="Active"
                    pendingTag="Pending"
                />
                <div className="text-right">
                    <SearchBar
                        onChange={(e) => setName(e.target.value)}
                        placeholder={"Search Managers"}
                    />
                </div>
            </div>
            <Heading content={title_headings.KAM} classname="my-[40px]" />
            <Table
                columns={MgrColumns}
                data={mgrs}
                setOffset={setOffset}
                name={title_headings.KAM}
            />
        </div>
    );
}

export default Manager;
