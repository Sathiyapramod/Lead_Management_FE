import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import Heading from "../../components/Heading";
import Table from "../../components/custom/Table/Table";
import API from "../../services/api";
import { toast } from "sonner";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";

export interface LeadList {
    id?: number;
    lead_name: string;
    rest_name: string;
    rest_addr1: string;
    rest_addr2: string;
    phone: string;
    mgr_id: string;
    lead_status: boolean;
    call_freq: string;
    last_call_date?: string;
    orders_placed?: number;
    orders_done?: number;
    created_at?: string;
    updated_at?: string;
}

function Leads(): React.ReactNode {
    const navigate = useNavigate();
    const { id } = useParams();
    const [leadList, setLeadList] = useState<LeadList[]>([]);

    const [offset, setOffset] = useState<number>(0);

    const getList = async () => {
        try {
            const { data, status } = await API.getLeads({
                limit: "10",
                offset: String(offset),
            });
            if (status !== 200) {
                toast.error("Error while fetching the Leads");
            } else {
                setLeadList(data);
            }
        } catch (err) {
            toast.error("Error");
        }
    };

    useEffect(() => {
        getList();
    }, [offset]);

    const onClick = () => navigate("/leads/create");

    const columns = [
        {
            id: 1,
            name: "Lead Name",
        },
        {
            id: 2,
            name: "Restaurant",
        },
        {
            id: 3,
            name: "Created On",
        },
        {
            id: 4,
            name: "Phone",
        },
        {
            id: 5,
            name: "Frequency",
        },
        {
            id: 6,
            name: "Status",
        },
        {
            id: 7,
            name: "Actions",
        },
    ];

    return (
        <div className="p-[55px]">
            <div className="flex justify-between items-start">
                <Card />
                <div className="text-right">
                    <SearchBar onChange={() => {}} placeholder={"Search Leads"} />
                    <Button
                        content="+ Create Lead"
                        theme="dark"
                        classname="rounded-lg mt-[15px]"
                        onClick={onClick}
                    />
                </div>
            </div>
            <Heading content={"Leads"} classname="my-[40px]" />
            <Table columns={columns} data={leadList} setOffset={setOffset} />
        </div>
    );
}

export default Leads;
