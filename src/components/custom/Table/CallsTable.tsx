import React from "react";

import { LeadList } from "../../../pages/Leads/Leads.types";
import callIcon from "../../../assets/call.svg";
import holdIcon from "../../../assets/end.svg";
import Button from "../../Button";

function CallsTable({
    data,
    handleCall,
    hangCall,
    callState,
}: {
    data?: LeadList[];
    handleCall?: (phone: string) => void;
    hangCall?: () => void;
    callState?: string;
}): React.ReactNode {
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
                <td className="px-6 py-4">{lead.orders_placed}</td>
                <td className="px-6 py-4">{lead.orders_done}</td>
                <td className="px-6 py-4">{lead.last_call_date?.split("T")[0] ?? ""}</td>
                <td className="px-6 py-4 text-center">{lead.phone}</td>
                <td className="px-6 py-4 uppercase">{lead.call_freq}</td>
                <td className="px-6 py-4 text-center flex gap-[15px]">
                    <Button
                        content={""}
                        onClick={() => {
                            if (handleCall) handleCall(lead?.phone);
                        }}
                        theme="light"
                        classname="w-fit bg-darkgreen border-none"
                        src={callIcon}
                    />
                    <Button
                        content={""}
                        onClick={() => {
                            if (hangCall) hangCall();
                        }}
                        theme="dark"
                        classname="w-fit bg-red-500 border-none"
                        disabled={callState === "On Call" ? true : false}
                        src={holdIcon}
                    />
                </td>
            </tr>
        ))
    );
}

export default CallsTable;
