import React from "react";
import { useNavigate } from "react-router-dom";

import formatAmt from "../../../helpers/formatAmount";
import Button from "../../Button";
import ToggleButton from "../ToggleButton";
import { OrdersList } from "../../../pages/Orders/Orders.types";

function OrdersTable({
    data,
    handleApproval,
}: {
    data?: OrdersList[];
    handleApproval?: (isApproved: boolean, id: number, lead_id: number) => void;
}): React.ReactNode {
    const navigate = useNavigate();
    const handleOrderEdit = (id: number) => {
        navigate(`/orders/edit/${id}`);
    };
    return data?.map((odr) => (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={odr.id}>
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
                {odr.lead_name}
            </th>
            <td className="px-6 py-4">{formatAmt(odr.order_value)}</td>
            <td className="px-6 py-4">{odr.placed_on ? odr.placed_on.split("T")[0] : ""}</td>
            <td className="px-6 py-4">{odr.closed_on ? odr.closed_on.split("T")[0] : "YTA"}</td>
            <td className="px-6 py-4">{odr.isApproved ? odr.mgr_name : "-"}</td>
            <td className="px-6 py-4">
                {window.localStorage.getItem("role") === "KAM" ? (
                    <ToggleButton
                        label=""
                        value={odr.isApproved}
                        onChange={() => {
                            if (handleApproval)
                                handleApproval(odr.isApproved, Number(odr.id), odr.lead_id);
                        }}
                    />
                ) : (
                    <Button
                        onClick={() => handleOrderEdit(Number(odr.id))}
                        content="edit"
                        theme="light"
                        disabled={odr.isApproved === true ? true : false}
                    />
                )}
            </td>
        </tr>
    ));
}

export default OrdersTable;
