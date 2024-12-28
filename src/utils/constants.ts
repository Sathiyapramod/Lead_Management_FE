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
