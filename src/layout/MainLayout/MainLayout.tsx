import React from "react";
import { Outlet } from "react-router-dom";

import Breadcrumbs from "../../components/Breadcrumbs";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer";

function MainLayout(): React.ReactNode {
    return (
        <div className="flex flex-row h-screen">
            <Sidebar />
            <div className="flex flex-col w-full bg-background min-h-screen">
                <Navbar />
                <TopNavbar />
                <main className="w-full px-0 rounded-[8px] overflow-y-auto bg-background z-0 flex-grow">
                    <Breadcrumbs />
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default MainLayout;
