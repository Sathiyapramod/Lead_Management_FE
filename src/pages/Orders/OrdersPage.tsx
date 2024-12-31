import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import Heading from "../../components/Heading";
import Table from "../../components/custom/Table/Table";
import API from "../../services/api";
import { toast } from "sonner";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { BaseTable } from "../../components/custom/Table/Table";
import { OrderColumns } from "../../utils/constants";
import { title_headings } from "../../utils/headings";

export interface OrdersList {
    id: number;
    lead_id: number;
    lead_name?: string;
    order_value: number;
    placed_on: Date;
    closed_on: Date;
    approved_on: Date;
    isApproved: boolean;
    isCreated: boolean;
}

interface Orders extends BaseTable {
    orders: OrdersList[];
}
function OrdersPage(): React.ReactNode {
    const navigate = useNavigate();
    const [ordersList, setOrdersList] = useState<Orders>({
        count: 0,
        active: 0,
        pending: 0,
        completed: 0,
        orders: [],
    });

    const [offset, setOffset] = useState<number>(0);

    const getList = async () => {
        try {
            const { data, status } = await API.getOrdersList({
                limit: "10",
                offset: String(offset),
            });
            if (status !== 200) {
                toast.error("Error while fetching the Leads");
            } else {
                setOrdersList(data);
            }
        } catch (err) {
            console.log(err);
            toast.error("Error");
        }
    };

    useEffect(() => {
        getList();
    }, [offset]);

    const onClick = () => {
        if (window.localStorage.getItem("role") === "KAM") navigate("/orders/create");
        else return;
    };

    return (
        <div className="p-[55px]">
            <div className="flex justify-between items-start">
                <Card
                    title={title_headings.ORDERS}
                    count={ordersList?.count ?? 0}
                    active={ordersList?.active ?? 0}
                    pending={ordersList?.pending ?? 0}
                />
                <div className="text-right">
                    <Button
                        content={"+ Create Order"}
                        theme="dark"
                        classname="rounded-lg mt-[15px]"
                        onClick={onClick}
                    />
                </div>
            </div>
            <Heading content={title_headings.ORDERS} classname="my-[40px]" />
            <Table
                columns={OrderColumns}
                data={ordersList}
                setOffset={setOffset}
                name={title_headings.ORDERS}
            />
        </div>
    );
}

export default OrdersPage;
