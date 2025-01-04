import React, { Dispatch, SetStateAction } from "react";

import { ContactsList } from "../../../pages/Contacts/Contacts.types";
import { ManagersList } from "../../../pages/KAM/Manager.types";
import { LeadList } from "../../../pages/Leads/Leads.types";
import { OrdersList } from "../../../pages/Orders/Orders.types";
import { title_headings } from "../../../utils/headings";
import { BaseTable } from "./Tables.types";
import OrdersTable from "./Orders";
import MgrTable from "./MgrTable";
import ContactsTable from "./ContactsTable";
import CallsTable from "./CallsTable";
import LeadsTable from "./LeadsTable";

export interface FinalTable extends BaseTable {
    leads?: LeadList[];
    contacts?: ContactsList[];
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
                            <LeadsTable data={data && data?.leads} />
                        ) : (
                            <></>
                        )}
                        {name === title_headings.CALLS && data ? (
                            <CallsTable
                                data={data && data?.leads}
                                handleCall={handleCall}
                                hangCall={hangCall}
                                callState={callState}
                            />
                        ) : (
                            <></>
                        )}
                        {name === title_headings.CONTACTS && data ? (
                            <ContactsTable
                                data={data && data.contacts}
                                handleCall={handleCall}
                                hangCall={hangCall}
                                callState={callState}
                            />
                        ) : (
                            <></>
                        )}
                        {name === title_headings.KAM && data ? (
                            <MgrTable data={data.managers} />
                        ) : (
                            <></>
                        )}
                        {name === title_headings.ORDERS && data?.orders ? (
                            <OrdersTable data={data.orders} handleApproval={handleApproval} />
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
