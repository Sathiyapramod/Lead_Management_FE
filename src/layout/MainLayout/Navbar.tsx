import React from "react";
import Heading from "../../components/Heading";
import Avatar from "../../components/Avatar";
import Chip from "../../components/Chip";
import Logout from "../../assets/logout.svg";
import API from "../../services/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Navbar(): React.ReactNode {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const { status } = await API.logout();
            if (status === 400 || status === 500) {
                toast.error("Error while Logging out ");
                return;
            } else {
                window.localStorage.clear();
                // todo : reset state in redux
                navigate("/");
                toast.success("Logged Out successfully");
                return;
            }
        } catch (err) {
            throw new Error("Error" + err);
        }
    };
    return (
        <div className="hidden md:visible md:z-100 sticky top-0 md:flex flex-row items-center p-[55px] flex-wrap sm:flex-nowrap ">
            <div className="flex flex-row justify-between items-center w-full">
                <Heading content={"Priorities for the Day !!!! "} />
                <div className="hidden md:flex flex-row items-center gap-[35px]">
                    <Chip content={window.localStorage.getItem("timezone") ?? ""} />
                    <div className="text-right">
                        {/* // todo: username display on navbar */}
                        <Heading content={"Dwayne Johnson"} classname="font-extrabold" />
                        <div className="text-light-gray text-sm">
                            {window.localStorage.getItem("role")}
                        </div>
                    </div>
                    {/* // todo: include logout option by action (or) button */}
                    <Avatar src={""} />
                    <Avatar
                        src={Logout}
                        classname="w-[25px] h-[25px] rounded cursor-pointer"
                        onClick={handleLogout}
                    />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
