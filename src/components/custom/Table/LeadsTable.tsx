import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../Button";
import StatusChip from "../Chip/StatusChip";
import { LeadList } from "../../../pages/Leads/Leads.types";

function LeadsTable({ data }: { data?: LeadList[] }): React.ReactNode {
    const navigate = useNavigate();

    const handleLeadEdit = (id: number) => {
        navigate(`/leads/edit/${id}`);
    };
    return (
        data &&
        data?.map((lead) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={lead.id}>
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                    {lead.lead_name}
                </th>
                <td className="px-6 py-4">{lead.rest_name}</td>
                <td className="px-6 py-4">{lead.created_at?.split("T")[0] ?? 0}</td>
                <td className="px-6 py-4 text-center">{lead.phone}</td>
                <td className="px-6 py-4 uppercase">{lead.call_freq}</td>
                <td className="px-6 py-4">
                    {lead.lead_status === true ? (
                        <StatusChip content="Active" tag={lead.lead_status} />
                    ) : (
                        <StatusChip content="Pending" tag={lead.lead_status} />
                    )}
                </td>
                <td className="px-6 py-4 text-center">
                    <Button
                        content={"Edit"}
                        onClick={() => handleLeadEdit(lead.id)}
                        theme="dark"
                        classname="w-fit"
                        disabled={window.localStorage.getItem("role") !== "KAM"}
                    />
                </td>
            </tr>
        ))
    );
}

export default LeadsTable;
