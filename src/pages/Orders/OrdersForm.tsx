import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import Button from "../../components/Button";
import DatePicker from "../../components/custom/Datepicker";
import SelectBox from "../../components/custom/InputBox/SelectBox";
import TextBox from "../../components/custom/InputBox/TextBox";
import Heading from "../../components/Heading";
import API from "../../services/api";
import { useTypedSelector } from "../../store";
import { OrdersList } from "./Orders.types";
import CustomStepper from "../../components/custom/Stepper/CustomStepper";

export interface AppOrderForm {
    sub: "create" | "edit";
}

function OrdersForm({ sub }: AppOrderForm): React.ReactNode {
    const { id } = useParams();

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
            const { status } = await API.createOrder({
                placed_on,
                order_value: Number(order_value),
                lead_id: Number(lead_id),
                isCreated,
                isApproved,
            });
            if (status !== 201) {
                toast.error("Error while fetching the Leads");
                navigate(-1);
            } else {
                //
            }
        } catch (err) {
            toast.error("Error");
        }
    };

    const getOrderById = async (id: number) => {
        try {
            const { data } = await API.getOrderById(id);
            if (!data) {
                toast.error("Failed to fetch data");
            } else {
                setCurrentOrder(data);
            }
        } catch (err) {
            toast.error("Error");
        }
    };

    const updateField = (field: string) => (value: string) => {
        setCurrentOrder((prevData) => {
            if (value.length > 7) {
                toast.warning("Length cannot be more than 7");
                return prevData;
            } else
                return {
                    ...prevData,
                    [field]: value,
                };
        });
    };

    const updateOrder = async (id: string) => {
        try {
            const isApproved = false;
            const { data } = await API.updateOrder({
                id: Number(id),
                isApproved,
                lead_id: currentOrder.lead_id,
                closed_on: currentOrder.closed_on,
            });
            if (!data) {
                toast.error("Failed to fetch data");
            } else {
                navigate("/orders");
                toast.success("Order Workflow sent to KAM for Further approval !!");
            }
        } catch (err) {
            toast.error("Error");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (sub === "create") createOrder();
        else {
            if (id) updateOrder(id);
        }
    };

    useEffect(() => {
        if (id) getOrderById(Number(id));
    }, [id]);

    return (
        <div className="lg:mx-[55px] bg-white">
            <Heading
                content={`${sub === "create" ? "Create" : "Edit"} Order`}
                classname="px-8 pt-8 my-[40px] max-md:px-5"
            />
            {sub === "edit" && (
                <CustomStepper
                    status={currentOrder.isApproved}
                    closed_on={currentOrder.closed_on}
                    approved_on={currentOrder.approved_on}
                />
            )}
            <form
                className="mx-auto p-4 max-md:mx-5 md:w-full lg:w-full lg:p-[30px] md:block lg:flex lg:flex-row lg:justify-center items-center lg:flex-wrap gap-8 relative"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-row justify-between">
                    {sub === "create" ? (
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
                    ) : (
                        <TextBox
                            label={"Order Date"}
                            value={currentOrder.placed_on}
                            onChange={() => {}}
                            disabled={true}
                        />
                    )}
                    {sub === "edit" && (
                        <DatePicker
                            currentValue={new Date().toISOString()}
                            label={"Closure Date"}
                            onClick={(e) =>
                                setCurrentOrder((pv) => {
                                    pv["placed_on"] = e.target.value;
                                    return pv;
                                })
                            }
                        />
                    )}
                </div>
                {sub === "create" ? (
                    <SelectBox
                        value={currentOrder.lead_id.toString()}
                        defaultValue="Select Leads"
                        label="Leads"
                        listName="leads"
                        leads={leadList.leads}
                        onChange={(e) => updateField("lead_id")(e.target.value)}
                    />
                ) : (
                    <TextBox
                        label={"Lead Name"}
                        value={currentOrder.lead_name}
                        onChange={() => {}}
                    />
                )}
                <TextBox
                    label={"Order Value"}
                    value={currentOrder.order_value.toString()}
                    disabled={sub === "edit" ? true : false}
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
