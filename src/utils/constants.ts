import { title_headings } from "./headings";

export interface MenuOptions {
    id: number;
    type: string;
    caption: string;
    path: string;
}

export const PERF_HEADINGS = {
    Outstanding: "3Days",
    Satisfactory: "7Days",
    Moderate: "14Days",
};

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
        id: 4,
        type: "single",
        caption: title_headings.ORDERS,
        path: "/orders",
    },
    {
        id: 5,
        type: "single",
        caption: title_headings.LEADS,
        path: "/leads",
    },
    {
        id: 6,
        type: "single",
        caption: title_headings.CONTACTS,
        path: "/contacts",
    },
    {
        id: 7,
        type: "single",
        caption: title_headings.ABOUT,
        path: "/about",
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
    "5": "Last Call Made",
    "6": "Phone",
    "7": "Call Frequency",
    "8": "Actions",
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

export const Stats_Table = {
    "1": "Restaurant Name",
    "2": "Lead Name",
    "3": "Order Value",
    "4": "Placed On",
    "5": "Approved On",
};
