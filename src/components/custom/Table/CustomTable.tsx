import React from "react";

import formatAmt from "../../../utils/formatAmount";
import { BaseReport } from "../../../pages/HomePage/HomePage.types";
import { Stats_Table } from "../../../config/constants";

interface PageCustomTable {
  columns: BaseReport[];
}
function CustomTable({ columns }: PageCustomTable): React.ReactNode {
  return (
    <div className="max-lg:w-fit relative overflow-x-auto">
      <table className="w-full text-sm md:text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {Object.entries(Stats_Table).map(([key, value]) => {
              return (
                <th scope="col" className="px-6 py-6" key={key}>
                  {value}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {columns &&
            columns.slice(0, 10).map((col, idx) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={idx}
              >
                <td className="px-6 py-4">{col.lead_name}</td>
                <td className="px-6 py-4 max-md:px-0">{col.rest_name}</td>
                <td className="px-6 py-4  text-center max-md:px-0">
                  {formatAmt(col.order_value)}
                </td>
                <td className="px-6 py-4 max-md:px-0">
                  {col.placed_on.split("T")[0]}
                </td>
                <td className="px-6 py-4 max-md:px-0">
                  {col.approved_on.split("T")[0]}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomTable;
