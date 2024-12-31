import { title_headings } from "./headings";

export interface MenuOptions {
    id: number;
    type: string;
    caption: string;
    path: string;
}

export const MENU_OPTIONS: MenuOptions[] = [
    {
        id: 1,
        type: "single",
        caption: title_headings.DASHBOARD,
        path: "/dashboard",
    },
    {
        id: 2,
        type: "single",
        caption: title_headings.CALLS,
        path: "/calls",
    },
    {
        id: 3,
        type: "single",
        caption: title_headings.KAM,
        path: "/managers",
    },
    {
        id: 6,
        type: "single",
        caption: title_headings.ORDERS,
        path: "/orders",
    },
    {
        id: 4,
        type: "single",
        caption: title_headings.LEADS,
        path: "/leads",
    },
    {
        id: 5,
        type: "single",
        caption: title_headings.CONTACTS,
        path: "/contacts",
    },
];

export const LeadColumns = {
    "1": "Lead Name",
    "2": "Restaurant",
    "3": "Created On",
    "4": "Phone",
    "5": "Frequency",
    "6": "Status",
    "7": "Actions",
};

export const CallSchedule = {
    "1": "Lead Name",
    "2": "Restaurant",
    "3": "Orders Placed",
    "4": "Orders Done",
    "5": "Phone",
    "6": "Call Frequency",
    "7": "Actions",
};
export const ContactList = {
    "1": "Contact Name",
    "2": "Lead Name",
    "3": "Designation",
    "4": "Phone",
    "5": "Contact Info",
    "6": "Actions",
};

export const OrderColumns = {
    "1": "id",
    "2": "lead_name",
    "4": "order_value",
    "5": "Created On",
    "6": "Approved On",
    "7": "Status",
    "8": "Approved by",
};

export const MgrColumns = {
    "1": "Id",
    "2": "Manager Name",
    "3": "Role",
    "4": "Phone",
    "5": "No. of Leads",
};

export const Contact_Roles = {
    Owner: "owner",
    "General Manager": "general_manager",
    Procurement: "procurement",
    Sales: "sales",
    Chef: "chef",
};
