import React from "react";
import Sidemenu from "../../components/custom/Sidebar/Sidemenu";

function Sidebar(): React.ReactNode {
    return (
        <div className="visible max-lg:hidden w-[252px] mt-[132px]">
            <Sidemenu />
        </div>
    );
}

export default Sidebar;
