import React from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs(): React.ReactNode {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(Boolean);

    const routeNameMap: Record<string, string> = {
        leads: "Leads",
        edit: "Edit Lead",
        create: "Create Lead",
        contacts: "Contacts",
        managers: "Managers",
        orders: "Orders",
        calls: "Calls",
    };
    return (
        <nav className="px-[55px] max-sm:p-[15px]">
            <ol className="flex space-x-2">
                <li>
                    <Link to="/dashboard" className="text-blue-500 hover:underline">
                        Home
                    </Link>
                </li>
                <span className="mx-2">/</span>
                {pathnames.map((segment, idx) => {
                    const to = `/${pathnames.slice(0, idx + 1).join("/")}`;
                    const isLast = idx === pathnames.length - 1;

                    return (
                        <li key={idx}>
                            {isLast ? (
                                <span className="text-gray-500 hover:underline capitalize">
                                    {routeNameMap.segment || segment}
                                </span>
                            ) : (
                                <Link to={to} className="text-blue-500 hover:underline capitalize">
                                    {routeNameMap.segment || segment}
                                </Link>
                            )}
                            {!isLast && <span className="mx-2">/</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumbs;
