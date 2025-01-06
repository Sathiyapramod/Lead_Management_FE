import React from "react";

import { ContactsList } from "../../../pages/Contacts/Contacts.types";
import Button from "../../Button";

function ContactsTable({
    data,
    handleCall,
    hangCall,
    callState,
}: {
    data?: ContactsList[];
    handleCall?: (phone: string) => void;
    hangCall?: () => void;
    callState?: string;
}): React.ReactNode {
    return data?.map((contact) => (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={contact.id}>
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
                {contact.cnct_name}
            </th>
            <td className="px-6 py-4">{contact.lead_id}</td>
            <td className="px-6 py-4">{contact.cnct_role}</td>
            <td className="px-6 py-4 text-center max-md:py-0">{contact.phone}</td>
            <td className="px-0 py-4">{contact.cnct_info}</td>
            <td className="px-6 py-4 text-center flex gap-[15px]">
                <Button
                    content={"Call"}
                    onClick={() => {
                        if (handleCall) handleCall(contact?.phone);
                    }}
                    theme="light"
                    classname="w-fit text-white bg-darkgreen border-none"
                />
                <Button
                    content={"End"}
                    onClick={() => {
                        if (hangCall) hangCall();
                    }}
                    theme="dark"
                    classname="w-fit bg-red-500 border-none"
                    disabled={callState === "On Call" ? true : false}
                />
            </td>
        </tr>
    ));
}

export default ContactsTable;
