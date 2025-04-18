import React from "react";
import Sidemenu from "../../components/custom/Sidebar/Sidemenu";

function TopNavbar(): React.ReactNode {
    return (
        <div className="hidden max-lg:block">
            <Sidemenu />
        </div>
    );
}

export default TopNavbar;
