import React, { Dispatch, SetStateAction } from "react";
import { LeadList } from "../../../pages/Leads/LeadsPage";
import StatusChip from "../../StatusChip";
import { useNavigate } from "react-router-dom";
import Button from "../../Button";
import callIcon from "../../../assets/call.svg";
import holdIcon from "../../../assets/end.svg";
import { ContactList } from "../../../pages/Contacts/ContactsPage";
import { OrdersList } from "../../../pages/Orders/OrdersPage";
import { ManagersList } from "../../../pages/KAM/Manager";
import { title_headings } from "../../../utils/headings";
import ToggleButton from "../ToggleButton";
import formatAmt from "../../../helpers/formatAmount";

export interface BaseTable {
    count: number;
    active?: number;
    pending?: number;
    completed?: number;
}

interface FinalTable extends BaseTable {
    leads?: LeadList[];
    contacts?: ContactList[];
    orders?: OrdersList[];
    managers?: ManagersList[];
}

interface AppTable {
    data: FinalTable;
    columns: Record<string, string>;
    name: string;
    setOffset: Dispatch<SetStateAction<number>>;
    callState?: string;
    handleCall?: (phone: string) => void;
    hangCall?: () => void;
    handleApproval?: (isApproved: boolean, id: number, lead_id: number) => void;
}

function Table({
    columns,
    data,
    setOffset,
    name,
    callState,
    handleCall,
    hangCall,
    handleApproval,
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
                            {Object.entries(columns).map(([key, value]) => {
                                return (
                                    <th scope="col" className="px-6 py-6" key={key}>
                                        {value}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {name === title_headings.LEADS && data ? (
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
                                            disabled={window.localStorage.getItem("role") !== "KAM"}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <></>
                        )}
                        {name === title_headings.CALLS && data ? (
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
                                    <td className="px-6 py-4">
                                        {lead.last_call_date?.split("T")[0]}
                                    </td>
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
                        {name === title_headings.CONTACTS && data ? (
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
                                    <td className="px-0 py-4">{contact.cnct_info}</td>
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
                        {name === title_headings.KAM && data ? (
                            data?.managers?.map((mgr) => (
                                <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={mgr.id}
                                >
                                    <td className="px-6 py-4">{mgr.id}</td>

                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {mgr.mgr_name}
                                    </th>
                                    <td className="px-6 py-4">{mgr.role}</td>
                                    <td className="px-6 py-4">{mgr.phone}</td>
                                    <td className="px-6 py-4">{mgr.leads}</td>
                                </tr>
                            ))
                        ) : (
                            <></>
                        )}
                        {name === title_headings.ORDERS && data ? (
                            data?.orders?.map((odr) => (
                                <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={odr.id}
                                >
                                    <td className="px-6 py-4">{odr.id}</td>

                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {odr.lead_name}
                                    </th>
                                    <td className="px-6 py-4">{formatAmt(odr.order_value)}</td>
                                    <td className="px-6 py-4">{odr.placed_on.split("T")[0]}</td>
                                    <td className="px-6 py-4">{odr.closed_on.split("T")[0]}</td>
                                    <td className="px-6 py-4">
                                        <ToggleButton
                                            label=""
                                            value={odr.isApproved}
                                            onChange={() => {
                                                if (handleApproval)
                                                    handleApproval(
                                                        odr.isApproved,
                                                        Number(odr.id),
                                                        odr.lead_id
                                                    );
                                            }}
                                        />
                                    </td>
                                    <td className="px-6 py-4">{odr.lead_name}</td>
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
