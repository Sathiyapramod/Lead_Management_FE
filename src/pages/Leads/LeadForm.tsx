import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import Button from "../../components/Button";
import SelectBox from "../../components/custom/InputBox/SelectBox";
import TextBox from "../../components/custom/InputBox/TextBox";
import Stepper from "../../components/custom/Stepper/Stepper";
import ToggleButton from "../../components/custom/ToggleButton";
import Heading from "../../components/Heading";
import API from "../../services/api";
import { useAppDispatch, useTypedSelector } from "../../store";
import { resetLeads } from "../../store/reducers/leads";
import { LeadList } from "./Leads.types";

export interface AppLeadForm {
    sub: "create" | "edit";
}

function LeadForm({ sub }: AppLeadForm) {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LeadList>({
        id: 0,
        lead_name: "",
        rest_name: "",
        rest_addr1: "",
        rest_addr2: "",
        phone: "",
        lead_status: false,
        mgr_id: 0,
        call_freq: "weekly",
        created_at: "",
        updated_at: "",
    });

    const { managers } = useTypedSelector((state) => state.analytics);

    const getLeadById = async (id: number) => {
        try {
            const { data, status } = await API.getLeadById(id);
            if (status !== 200) {
                toast.error("Error while fetching the Leads");
            } else {
                setFormData(data);
            }
        } catch (err) {
            toast.error("Error");
        }
    };

    useEffect(() => {
        if (id) getLeadById(Number(id));
    }, [id]);

    const updateField = (field: string) => (value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const createLead = async () => {
        try {
            const { status } = await API.createLead({
                ...formData,
                mgr_id: Number(formData.mgr_id),
                lead_status: true,
            });
            if (status !== 201) {
                toast.error("Error while creating Leads");
            } else {
                dispatch(resetLeads());
                navigate("/leads");
                toast.success("Lead Created successfully");
            }
        } catch (err) {
            toast.error("Error");
        }
    };

    const updateLead = async (id: number) => {
        try {
            const lead_status = formData.lead_status;
            const { status } = await API.updateLead(
                {
                    lead_status: !lead_status,
                },
                id
            );
            if (status !== 200) {
                toast.error("Error while creating Leads");
            } else {
                navigate(-1);
                dispatch(resetLeads());
                toast.success("Lead Updated successfully");
            }
        } catch (err) {
            toast.error("Error");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (sub === "create") createLead();
        else updateLead(Number(id));
    };

    return (
        <div className="lg:mx-[55px] bg-white">
            <Heading
                content={`${sub === "create" ? "Create" : "Edit"} Lead`}
                classname="px-8 pt-8 my-[40px] max-md:px-5"
            />
            {sub === "edit" && <Stepper status={formData.lead_status} />}
            <form
                onSubmit={handleSubmit}
                className="mx-auto p-4 max-md:mx-5 md:w-full lg:w-full lg:p-[30px] md:block lg:flex lg:flex-row lg:justify-start lg:flex-wrap gap-8 relative"
            >
                <TextBox
                    label={"Lead Name"}
                    value={formData.lead_name}
                    onChange={(e) => updateField("lead_name")(e.target.value)}
                />
                <TextBox
                    label={"Restaurant Name"}
                    value={formData.rest_name}
                    onChange={(e) => updateField("rest_name")(e.target.value)}
                />
                <TextBox
                    label={"Restaurant Address 1"}
                    value={formData.rest_addr1}
                    onChange={(e) => updateField("rest_addr1")(e.target.value)}
                />
                <TextBox
                    label={"Restaurant Address 2"}
                    value={formData.rest_addr2}
                    onChange={(e) => updateField("rest_addr2")(e.target.value)}
                />
                <TextBox
                    label={"Phone"}
                    value={formData.phone}
                    onChange={(e) => updateField("phone")(e.target.value)}
                />
                <SelectBox
                    value={formData.mgr_id.toString()}
                    defaultValue="Select Manager"
                    label="Manager"
                    list={managers.managers}
                    listName="managers"
                    onChange={(e) => updateField("mgr_id")(e.target.value)}
                />
                <div className="mb-4 lg:basis-1/5">
                    <label className="block text-left text-sm font-medium text-gray-70">
                        Call Frequency
                    </label>
                    <select
                        value={formData.call_freq}
                        onChange={(e) => updateField("call_freq")(e.target.value)}
                        className="mt-1 block p-2 border-b-[0.5px] border-light-black focus:border-blue-300 focus:outline-none max-lg:w-[325px] min-[320px]:w-full max-md:w-full"
                        required
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                    </select>
                </div>
                {sub === "edit" && (
                    <ToggleButton
                        value={formData.lead_status}
                        onChange={() =>
                            setFormData((pv) => {
                                const { lead_status } = pv;
                                return { ...pv, lead_status: !lead_status };
                            })
                        }
                        label="Lead Status"
                    />
                )}
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

export default LeadForm;
