import React, { lazy } from "react";
import MainLayout from "../layout/MainLayout/MainLayout";

const Leads = lazy(() => import("../pages/Leads/LeadsPage"));
const LeadForm = lazy(() => import("../pages/Leads/LeadForm"));
const Contacts = lazy(() => import("../pages/Contacts/ContactsPage"));
const ContactForm = lazy(() => import("../pages/Contacts/ContactForm"));
const Dashboard = lazy(() => import("../pages/HomePage/HomePage"));
const CallPage = lazy(() => import("../pages/My Calls/CallPage"));

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
        {
            path: "/contacts/:id",
            element: <ContactForm />,
        },
        {
            path: "/calls",
            element: <CallPage />,
        },
    ],
};

export default MainRoutes;
