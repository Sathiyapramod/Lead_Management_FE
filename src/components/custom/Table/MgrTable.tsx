import React from "react";

import { ManagersList } from "../../../pages/KAM/Manager.types";

export default function MgrTable({ data }: { data?: ManagersList[] }): React.ReactNode {
    return data?.map((mgr) => (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={mgr.id}>
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
    ));
}
