import React from "react";

function Footer() {
    return (
        <div className="flex justify-center items-center px-[55px] py-[20px] font-bold">
            Copyrights ©{new Date().getFullYear()} All Rights Reserved
        </div>
    );
}

export default Footer;
