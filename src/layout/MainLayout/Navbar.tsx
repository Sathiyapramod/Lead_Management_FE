import React from "react";
import Heading from "../../components/Heading";
import Avatar from "../../components/Avatar";
import { useNavigate } from "react-router-dom";
import Chip from "../../components/Chip";
import API from "../../services/api";
import { toast } from "sonner";

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await API.logout();
            toast.success("Logged out Successfully");
            navigate("/");
        } catch (err) {
            toast.error("Error");
        }
    };
    return (
        <div className="hidden md:visible md:z-100 sticky top-0 md:flex flex-row items-center p-[55px] flex-wrap sm:flex-nowrap ">
            <div className="flex flex-row justify-between items-center w-full">
                <Heading content={"Priorities for the Day !!!! "} />
                <div className="hidden md:flex flex-row items-center gap-[35px]">
                    <Chip content={window.localStorage.getItem("timezone") ?? ""} />
                    <div className="text-right">
                        <Heading content={"Dwayne Johnson"} classname="font-extrabold" />
                        <div className="text-light-gray text-sm">Team Lead</div>
                    </div>
                    <Avatar src={""} />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
