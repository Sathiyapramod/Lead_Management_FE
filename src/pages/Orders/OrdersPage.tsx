import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Button from "../../components/Button";
import Card from "../../components/Card";
import Table from "../../components/custom/Table/Table";
import { BaseTable } from "../../components/custom/Table/Tables.types";
import Heading from "../../components/Heading";
import API from "../../services/api";
import { useAppDispatch, useTypedSelector } from "../../store";
import { fetchOrders } from "../../store/reducers/performance";
import { OrderColumns } from "../../utils/constants";
import { title_headings } from "../../utils/headings";
import { OrdersList } from "./Orders.types";

interface Orders extends BaseTable {
    orders: OrdersList[];
}

function OrdersPage(): React.ReactNode {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { analytics } = useTypedSelector((state) => state);
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
            let lead_name: string | null = "";
            switch (window.localStorage.getItem("role")) {
                case "KAM":
                    lead_name = "";
                    break;
                case "contact":
                    lead_name = window.localStorage.getItem("username");
                    break;
                case "lead":
                    lead_name = window.localStorage.getItem("username");
                    break;
                default:
                    lead_name = "";
                    break;
            }
            const { data, status } = await API.getOrdersList({
                limit: "10",
                offset: String(offset),
                lead_name: lead_name ?? "",
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
        dispatch(fetchOrders());
    }, [offset]);

    const onClick = () => {
        if (window.localStorage.getItem("role") === "KAM") navigate("/orders/create");
        else {
            toast.warning("Creating Access only to the KAM");
        }
    };

    const handleApproval = async (isApproved: boolean, id: number, lead_id: number) => {
        try {
            const approved_on = new Date().toISOString();
            const { status } = await API.updateOrder({
                isApproved: !isApproved,
                id,
                lead_id,
                approved_on,
            });
            if (status !== 200) {
                toast.error("Error while fetching the Leads");
            } else {
                getList();
                toast.success(`Order No.${id} updated Successfully`);
            }
        } catch (err) {
            console.log(err);
            toast.error("Error");
        }
    };

    return (
        <div className="p-[55px]">
            <div className="flex justify-between items-start">
                <Card
                    title={title_headings.ORDERS}
                    count={analytics.orders?.count ?? 0}
                    active={analytics.orders?.active ?? 0}
                    pending={analytics.orders?.pending ?? 0}
                    activeTag="Active"
                    pendingTag="Pending"
                    classname="w-[400px]"
                />
                <div className="text-right">
                    <Button
                        content={`Create Order`}
                        theme="dark"
                        classname="rounded-lg mt-[15px]"
                        onClick={onClick}
                        disabled={false}
                    />
                </div>
            </div>
            <Heading content={title_headings.ORDERS} classname="my-[40px]" />
            <Table
                columns={OrderColumns}
                data={ordersList}
                setOffset={setOffset}
                name={title_headings.ORDERS}
                handleApproval={handleApproval}
            />
        </div>
    );
}

export default OrdersPage;
