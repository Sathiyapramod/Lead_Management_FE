import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { toast } from "sonner";
import Card from "../../components/Card";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import Table from "../../components/custom/Table/Table";
import { ContactList } from "../../utils/constants";

export interface ContactList {
    id?: number;
    lead_id: number;
    cnct_name: string;
    cnct_role: "owner" | "procurement" | "sales" | "general manager" | "chef";
    cnct_info: string;
    phone: string;
    created_at?: string;
    updated_at?: string;
}

function Contacts() {
    const navigate = useNavigate();
    const [contactList, setContactsList] = useState<{
        count: number;
        active: number;
        pending: number;
        contacts: ContactList[];
    }>();
    const [offset, setOffset] = useState<number>(0);

    const getList = async () => {
        try {
            const { data, status } = await API.getContacts({
                limit: "10",
                offset: String(offset),
            });
            if (status !== 200) {
                toast.error("Error while fetching the Leads");
            } else {
                setContactsList(data);
            }
        } catch (err) {
            toast.error("Error");
        }
    };

    useEffect(() => {
        getList();
    }, [offset]);

    const onClick = () => navigate("/leads/create");

    return (
        <div className="p-[55px]">
            <div className="flex justify-between items-start">
                <Card
                    title={"Contacts"}
                    count={contactList?.count ?? 0}
                    active={contactList?.active ?? 0}
                    pending={contactList?.pending ?? 0}
                />
                <div className="text-right">
                    <SearchBar onChange={() => {}} placeholder={"Search Leads"} />
                    <Button
                        content="+ Create Contact"
                        theme="dark"
                        classname="rounded-lg mt-[15px]"
                        onClick={onClick}
                    />
                </div>
            </div>
            <Heading content={"Contacts"} classname="my-[40px]" />
            {contactList && (
                <Table
                    columns={ContactList}
                    data={contactList}
                    setOffset={setOffset}
                    name="contacts"
                />
            )}
        </div>
    );
}

export default Contacts;
