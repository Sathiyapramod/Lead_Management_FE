import React from "react";
import Sidemenu from "../../components/custom/Sidebar/Sidemenu";

function Sidebar() {
    return (
        <div className="hidden md:block w-[252px] mt-[132px]">
            <Sidemenu />
        </div>
    );
}

export default Sidebar;
