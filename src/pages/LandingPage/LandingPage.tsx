import React from "react";
import Landing from "../../components/custom/Landing/Landing";

function LandingPage() {
    return (
        <div className="flex flex-row justify-center items-center mx-auto border h-screen">
            <div className="flex-1  h-full"></div>
            <Landing />
        </div>
    );
}

export default LandingPage;
