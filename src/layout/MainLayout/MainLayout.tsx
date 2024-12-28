import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function MainLayout() {
    return (
        <div className="flex flex-row h-screen">
            <Sidebar />
            <div className="flex flex-col w-full bg-background">
                <Navbar />
                <main className="w-full px-0 rounded-[8px] overflow-y-auto bg-background z-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
