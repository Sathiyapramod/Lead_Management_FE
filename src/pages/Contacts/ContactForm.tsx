import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Button from "../../components/Button";
import TextBox from "../../components/custom/InputBox/TextBox";
import Heading from "../../components/Heading";
import API from "../../services/api";
import { useTypedSelector } from "../../store";
import { Contact_Roles } from "../../utils/constants";
import { AppLeadForm } from "../Leads/LeadForm";
import { ContactsList } from "./Contacts.types";

function ContactForm({ sub }: AppLeadForm): React.ReactNode {
    const navigate = useNavigate();

    const { leadList } = useTypedSelector((state) => state.analytics);
    const { currentContact } = useTypedSelector((state) => state.contacts);

    const [formData, setFormData] = useState<ContactsList>({
        lead_id: 0,
        cnct_name: "",
        cnct_info: "",
        cnct_role: "owner",
        phone: "",
    });

    const updateField = (field: string) => (value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    useEffect(
        () =>
            setFormData((pv) => {
                if (sub === "edit" && currentContact) return { ...currentContact };
                else return pv;
            }),
        []
    );

    const createLead = async () => {
        try {
            const { status } = await API.createContact({
                ...formData,
                lead_id: Number(formData.lead_id),
            });
            if (status !== 201) {
                toast.error("Error while creating Leads");
            } else {
                navigate("/contacts");
                toast.success("Contact Created successfully");
            }
        } catch (err) {
            toast.error("Error");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (sub === "create") createLead();
    };

    return (
        <div className="lg:px-[55px] ">
            <Heading
                content={`${sub === "create" ? "Create" : "Edit"} Contact`}
                classname="my-[40px] max-md:px-5"
            />
            <form
                onSubmit={handleSubmit}
                className="mx-auto p-4 max-md:mx-5 md:w-full lg:w-full lg:p-[30px] bg-white rounded-lg shadow-md md:block lg:flex lg:flex-row lg:justify-start lg:flex-wrap gap-8 relative"
            >
                <TextBox
                    label={"Contact Name"}
                    value={formData.cnct_name}
                    onChange={(e) => updateField("cnct_name")(e.target.value)}
                />
                <div className="mb-4 lg:basis-1/5">
                    <label className="block text-left text-sm font-medium text-gray-70">
                        Designation
                    </label>
                    <select
                        value={formData.cnct_role}
                        onChange={(e) => updateField("cnct_role")(e.target.value)}
                        className="mt-1 block p-2 border-b-[0.5px] border-light-black focus:border-blue-300 focus:outline-none max-lg:w-[325px] min-[320px]:w-full max-md:w-full"
                        required
                    >
                        <option value="select">Select Role</option>
                        {Object.entries(Contact_Roles).map(([key, value]) => (
                            <option value={value} key={value}>
                                {key}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4 lg:basis-1/5">
                    <label className="block text-left text-sm font-medium text-gray-70">
                        Select Leads
                    </label>
                    <select
                        value={formData.lead_id}
                        onChange={(e) => updateField("lead_id")(e.target.value)}
                        className="mt-1 block p-2 border-b-[0.5px] border-light-black focus:border-blue-300 focus:outline-none max-lg:w-[325px] min-[320px]:w-full max-md:w-full"
                        required
                    >
                        <option value="select">Select Lead</option>
                        {leadList.leads.map((lead) => (
                            <option value={lead.id} key={lead.id}>
                                {lead.lead_name}
                            </option>
                        ))}
                    </select>
                </div>
                <TextBox
                    label={"Contact Info"}
                    value={formData.cnct_info}
                    onChange={(e) => updateField("cnct_info")(e.target.value)}
                />
                <TextBox
                    label={"Phone"}
                    value={formData.phone}
                    onChange={(e) => updateField("phone")(e.target.value)}
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

export default ContactForm;
