import React, { lazy } from "react";
import MainLayout from "../layout/MainLayout/MainLayout";

const Leads = lazy(() => import("../pages/Leads/LeadsPage"));
const LeadForm = lazy(() => import("../pages/Leads/LeadForm"));
const Contacts = lazy(() => import("../pages/Contacts/ContactsPage"));
const Dashboard = lazy(() => import("../pages/HomePage/HomePage"));

const MainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/home",
            element: <Dashboard />,
        },
        {
            path: "/leads",
            element: <Leads />,
        },
        {
            path: "/leads/edit/:id",
            element: <LeadForm sub={"edit"} />,
        },
        {
            path: "/leads/create",
            element: <LeadForm sub={"create"} />,
        },
        {
            path: "/contacts",
            element: <Contacts />,
        },
    ],
};

export default MainRoutes;
