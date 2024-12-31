import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import Heading from "../../components/Heading";
import Table from "../../components/custom/Table/Table";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { LeadColumns } from "../../utils/constants";
import { useAppDispatch, useTypedSelector } from "../../store";
import { fetchLeadLists } from "../../store/reducers/leads";
import { title_headings } from "../../utils/headings";

export interface LeadList {
    id: number;
    lead_name: string;
    rest_name: string;
    rest_addr1: string;
    rest_addr2: string;
    phone: string;
    mgr_id: number;
    lead_status?: boolean;
    call_freq: string;
    last_call_date?: string;
    orders_placed?: number;
    orders_done?: number;
    created_at: string;
    updated_at: string;
}

function Leads(): React.ReactNode {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchName, setName] = useState<string>("");
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
        dispatch(fetchLeadLists({ offset: String(offset), limit: "10", searchName }));
    }, [offset, searchName]);

    const { leadList } = useTypedSelector((state) => state.leads);

    const onClick = () => {
        if (window.localStorage.getItem("role") === "KAM") navigate("/leads/create");
        else return;
    };

    return (
        <div className="p-[55px]">
            <div className="flex justify-between items-start">
                <Card
                    title={title_headings.LEADS}
                    count={leadList?.count ?? 0}
                    active={leadList?.active ?? 0}
                    pending={leadList?.pending ?? 0}
                />
                <div className="text-right">
                    <SearchBar
                        onChange={(e) => setName(e.target.value)}
                        placeholder={"Search Leads"}
                    />
                    <Button
                        content="+ Create Lead"
                        theme="dark"
                        classname="rounded-lg mt-[15px]"
                        onClick={onClick}
                    />
                </div>
            </div>
            <Heading content={title_headings.LEADS} classname="my-[40px]" />
            <Table
                columns={LeadColumns}
                data={leadList}
                setOffset={setOffset}
                name={title_headings.LEADS}
            />
        </div>
    );
}

export default Leads;
