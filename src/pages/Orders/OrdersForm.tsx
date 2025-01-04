import React, { useState } from "react";
import Heading from "../../components/Heading";
import { OrdersList } from "./OrdersPage";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import TextBox from "../../components/custom/InputBox/TextBox";
import DatePicker from "../../components/custom/Datepicker";
import SelectBox from "../../components/custom/InputBox/SelectBox";
import Button from "../../components/Button";
import { useTypedSelector } from "../../store";

function OrdersForm({ sub }: Record<string, string>): React.ReactNode {
    const { leadList } = useTypedSelector((state) => state.analytics);
    const navigate = useNavigate();
    const [currentOrder, setCurrentOrder] = useState<OrdersList>({
        id: 0,
        lead_id: 0,
        lead_name: "",
        order_value: 0,
        placed_on: "",
        closed_on: "",
        approved_on: "",
        isApproved: false,
        isCreated: true,
    });

    const createOrder = async () => {
        try {
            const { placed_on, order_value, lead_id, isCreated, isApproved } = currentOrder;
            const { data, status } = await API.createOrder({
                placed_on,
                order_value: Number(order_value),
                lead_id: Number(lead_id),
                isCreated,
                isApproved,
            });
            if (status !== 200) {
                toast.error("Error while fetching the Leads");
                navigate(-1);
            } else {
                setLeads(data.leads);
            }
        } catch (err) {
            toast.error("Error");
        }
    };

    const updateField = (field: string) => (value: string) => {
        setCurrentOrder((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (sub === "create") createOrder();
        else return;
    };

    return (
        <div className="lg:mx-[55px] bg-white">
            <Heading
                content={`${sub === "create" ? "Create" : "Edit"} Lead`}
                classname="px-8 pt-8 my-[40px] max-md:px-5"
            />
            <form
                className="mx-auto p-4 max-md:mx-5 md:w-full lg:w-full lg:p-[30px] md:block lg:flex lg:flex-row lg:justify-start lg:flex-wrap gap-8 relative"
                onSubmit={handleSubmit}
            >
                <DatePicker
                    currentValue={new Date().toISOString()}
                    label={"Order Date"}
                    onClick={(e) =>
                        setCurrentOrder((pv) => {
                            pv["placed_on"] = e.target.value;
                            return pv;
                        })
                    }
                />
                <SelectBox
                    value={currentOrder.lead_id.toString()}
                    defaultValue="Select Leads"
                    label="Leads"
                    listName="leads"
                    leads={leadList.leads}
                    onChange={(e) => updateField("lead_id")(e.target.value)}
                />
                <TextBox
                    label={"Order Value"}
                    value={currentOrder.order_value.toString()}
                    onChange={(e) => updateField("order_value")(e.target.value)}
                />
                <Button
                    type="submit"
                    content="Submit"
                    theme="dark"
                    classname="absolute inset bottom-[35px] right-[25px] max-md:relative max-md:mt-[50px] max-md:mx-3"
                />
            </form>
        </div>
    );
}

export default OrdersForm;
