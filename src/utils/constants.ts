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
        caption: "Dashboard",
        path: "/home",
    },
    {
        id: 2,
        type: "single",
        caption: "My Calls",
        path: "/calls",
    },
    {
        id: 3,
        type: "single",
        caption: "KAM",
        path: "/managers",
    },
    {
        id: 4,
        type: "single",
        caption: "Leads",
        path: "/leads",
    },
    {
        id: 5,
        type: "single",
        caption: "Contacts",
        path: "/contacts",
    },
];

export const LeadColumns = [
    {
        id: 1,
        name: "Lead Name",
    },
    {
        id: 2,
        name: "Restaurant",
    },
    {
        id: 3,
        name: "Created On",
    },
    {
        id: 4,
        name: "Phone",
    },
    {
        id: 5,
        name: "Frequency",
    },
    {
        id: 6,
        name: "Status",
    },
    {
        id: 7,
        name: "Actions",
    },
];

export const CallSchedule = [
    {
        id: 1,
        name: "Lead Name",
    },
    {
        id: 2,
        name: "Restaurant",
    },
    {
        id: 3,
        name: "Orders Placed",
    },
    {
        id: 4,
        name: "Orders Closed",
    },
    {
        id: 5,
        name: "Phone",
    },
    {
        id: 6,
        name: "Frequency",
    },
    {
        id: 8,
        name: "Actions",
    },
];
export const ContactList = [
    {
        id: 1,
        name: "Contact Name",
    },
    {
        id: 2,
        name: "Lead Name",
    },
    {
        id: 3,
        name: "Designation",
    },
    {
        id: 4,
        name: "Phone",
    },
    {
        id: 5,
        name: "Contact Info",
    },
    {
        id: 6,
        name: "Actions",
    },
];
