import React, { useState } from "react";
import Button from "../../Button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import API from "../../../services/api";

function Login(): React.ReactNode {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        if (username === "" || password === "") {
            toast.error("Credentials cannot be Empty");
        } else {
            e.preventDefault();
            const { data, status } = await API.login(username, password);
            if (status !== 201) {
                toast.error("Error while logging in");
                navigate("/");
            } else {
                const { access_token, role, userId, timezone } = data;
                window.localStorage.setItem("token", access_token);
                window.localStorage.setItem("role", role);
                window.localStorage.setItem("userId", userId);
                window.localStorage.setItem("timezone", timezone);
                navigate("/home");
            }
        }
    };

    return (
        <form>
            <div className="m-4">
                <label
                    htmlFor="email-address"
                    className="block text-left text-sm font-medium text-gray-70"
                >
                    Email Id
                </label>
                <input
                    id="email-address"
                    className="mt-1 block p-2 border-b-[0.5px] border-light-black focus:border-none focus:outline-none w-[325px]"
                    name="email"
                    type="email"
                    required
                    placeholder="john@yourdomain.com"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="m-4">
                <label
                    htmlFor="password"
                    className="block text-sm  text-left font-medium text-gray-70"
                >
                    Password
                </label>
                <input
                    className="mt-1 block p-2 border-b-[0.5px] border-light-black focus:border-none focus:outline-none w-[325px]"
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="*********"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex flex-row-reverse m-4">
                {/* <div
                    className="text-light-gray font-sm hover:underline hover:underline-offset-4 cursor-pointer"
                    onClick={onChange}
                >
                    New User ? Register Here
                </div> */}
            </div>
            <div className="flex flex-row justify-center mb-8">
                <Button onClick={handleSubmit} theme="light" content="Login" />
            </div>
        </form>
    );
}

export default Login;
