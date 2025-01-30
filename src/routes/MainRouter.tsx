import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout/MainLayout";

const Leads = React.lazy(() => import("../pages/Leads/LeadsPage"));
const LeadForm = lazy(() => import("../pages/Leads/LeadForm"));
const Contacts = lazy(() => import("../pages/Contacts/ContactsPage"));
const ContactForm = lazy(() => import("../pages/Contacts/ContactForm"));
const Dashboard = lazy(() => import("../pages/HomePage/HomePage"));
const CallPage = lazy(() => import("../pages/My Calls/CallPage"));
const Manager = lazy(() => import("../pages/KAM/Manager"));
const Orders = lazy(() => import("../pages/Orders/OrdersPage"));
const OrdersForm = lazy(() => import("../pages/Orders/OrdersForm"));
const AboutPage = lazy(() => import("../pages/About/About"));

const MainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/dashboard",
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
            path: "/contacts/create",
            element: <ContactForm sub={"create"} />,
        },

        {
            path: "/managers",
            element: <Manager />,
        },
        {
            path: "/orders",
            element: <Orders />,
        },
        {
            path: "/orders/create",
            element: <OrdersForm sub="create" />,
        },
        {
            path: "/orders/edit/:id",
            element: <OrdersForm sub="edit" />,
        },
        {
            path: "/calls",
            element: <CallPage />,
        },
        {
            path: "/leads/edit",
            element: <Navigate to="/leads" replace />,
        },
        {
            path: "/orders/edit",
            element: <Navigate to="/orders" replace />,
        },
        {
            path: "/about",
            element: <AboutPage />,
        },
        {
            path: "/*",
            element: <Navigate to="/about" replace />,
        },
    ],
};

export default MainRoutes;
