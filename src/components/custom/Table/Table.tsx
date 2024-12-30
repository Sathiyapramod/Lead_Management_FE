import React, { Dispatch, SetStateAction } from "react";
import { LeadList } from "../../../pages/Leads/LeadsPage";
import StatusChip from "../../StatusChip";
import { useNavigate } from "react-router-dom";
import Button from "../../Button";
import callIcon from "../../../assets/call.svg";
import holdIcon from "../../../assets/end.svg";
import { ContactList } from "../../../pages/Contacts/ContactsPage";

interface AppTable {
    data:
        | {
              count: number;
              active?: number;
              pending?: number;
              leads?: LeadList[];
              completed?: number;
              contacts?: ContactList[];
          }
        | undefined;
    columns: {
        id: number;
        name: string;
    }[];
    name: string;
    setOffset: Dispatch<SetStateAction<number>>;
    callState?: string;
    handleCall?: (phone: string) => void;
    hangCall?: () => void;
}

function Table({
    columns,
    data,
    setOffset,
    name,
    callState,
    handleCall,
    hangCall,
}: AppTable): React.ReactNode {
    const navigate = useNavigate();

    const handleEdit = (id: number) => {
        navigate(`/leads/edit/${id}`);
    };

    return (
        <div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm md:text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {columns.map((col) => (
                                <th scope="col" className="px-6 py-3" key={col.id}>
                                    {col.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {name === "leads" && data ? (
                            data?.leads?.map((lead) => (
                                <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={lead.id}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {lead.lead_name}
                                    </th>
                                    <td className="px-6 py-4">{lead.rest_name}</td>
                                    <td className="px-6 py-4">{lead.created_at.split("T")[0]}</td>
                                    <td className="px-6 py-4 text-center">{lead.phone}</td>
                                    <td className="px-6 py-4 uppercase">{lead.call_freq}</td>
                                    <td className="px-6 py-4">
                                        {lead.lead_status ? (
                                            <StatusChip content="Active" tag={lead.lead_status} />
                                        ) : (
                                            <StatusChip content="Pending" tag={lead.lead_status} />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Button
                                            content={"Edit"}
                                            onClick={() => handleEdit(lead.id)}
                                            theme="dark"
                                            classname="w-fit"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <></>
                        )}
                        {name === "calls" && data ? (
                            data?.leads?.map((lead) => (
                                <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={lead.id}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {lead.lead_name}
                                    </th>
                                    <td className="px-6 py-4">{lead.rest_name}</td>
                                    <td className="px-6 py-4">{lead.orders_placed}</td>
                                    <td className="px-6 py-4">{lead.orders_done}</td>

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
                        ) : (
                            <></>
                        )}
                        {name === "contacts" && data ? (
                            data?.contacts?.map((contact) => (
                                <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={contact.id}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {contact.cnct_name}
                                    </th>
                                    <td className="px-6 py-4">{contact.lead_id}</td>
                                    <td className="px-6 py-4">{contact.cnct_role}</td>
                                    <td className="px-6 py-4 text-center max-md:py-0">
                                        {contact.phone}
                                    </td>
                                    <td className="px-6 py-4">{contact.cnct_info}</td>
                                    <td className="px-6 py-4 text-center flex gap-[15px]">
                                        <Button
                                            content={""}
                                            onClick={() => {
                                                if (handleCall) handleCall(contact?.phone);
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
                        ) : (
                            <></>
                        )}
                    </tbody>
                </table>
            </div>
            <nav className="flex flex-row-reverse flex-wrap md:flex-row justify-between pt-4">
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <span
                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                            onClick={() =>
                                setOffset((pv) => {
                                    if (pv === 0 || pv === 10) return pv;
                                    else return pv - 10;
                                })
                            }
                        >
                            Previous
                        </span>
                    </li>
                    <li>
                        <span
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                            onClick={() => setOffset((pv) => pv + 10)}
                        >
                            Next
                        </span>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Table;
