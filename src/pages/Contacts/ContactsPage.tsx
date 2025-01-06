import { Device } from "@twilio/voice-sdk";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Button from "../../components/Button";
import Card from "../../components/Card";
import Table from "../../components/custom/Table/Table";
import { BaseTable } from "../../components/custom/Table/Tables.types";
import Heading from "../../components/Heading";
import SearchBar from "../../components/SearchBar";
import API from "../../services/api";
import { ContactList } from "../../utils/constants";
import { title_headings } from "../../utils/headings";
import { ContactsList } from "./Contacts.types";
import { TwilioCall } from "../My Calls/Calls.types";

type CallState = TwilioCall | null;

interface Contacts extends BaseTable {
    contacts: ContactsList[];
}

function Contacts(): React.ReactNode {
    const navigate = useNavigate();
    const [contactList, setContactsList] = useState<Contacts>({
        count: 0,
        active: 0,
        pending: 0,
        contacts: [],
    });

    const [offset, setOffset] = useState<number>(0);
    const [searchName, setSearchName] = useState<string>("");
    const [Call, setCall] = useState<CallState>(null);
    const [callDevice, setDevice] = useState<Device | undefined>(undefined);
    const [userState, setUserState] = useState<string>("Idle");

    const getList = async () => {
        try {
            const { data, status } = await API.getContacts({
                limit: "10",
                offset: String(offset),
                searchName,
            });
            if (status !== 200) {
                toast.error("Error while fetching the Leads");
            } else {
                setContactsList(data);
            }
        } catch (err) {
            toast.error("Error");
        }
    };

    useEffect(() => {
        getList();
    }, [offset, searchName]);

    const onClick = () => navigate("/contacts/create");

    const initialToken = async () => {
        try {
            const { data, status } = await API.getTwilioToken();
            if (status !== 200) toast.error("Failed to fetch token for calls");
            else {
                const { token } = data;
                const device = new Device(token, {
                    logLevel: 4,
                    debug: true,
                    answerOnBridge: true,
                    timeout: 20000,
                    codecPreferences: ["opus", "pcmu"],
                });

                device.register();
                setDevice(device);

                const micstatus = await navigator.permissions.query({
                    name: "microphone",
                });

                console.log("@@mic status", micstatus);
                if (micstatus.state === "denied") {
                    setUserState("Waiting");
                    toast.warning("Microphone access is denied. Please enable it for this website");
                }

                device?.on("registered", () => {
                    console.log(device.edge);
                });

                return () => {
                    device.destroy();
                    setDevice(undefined);
                };
            }
        } catch (err) {
            console.log(err);
        }
    };

    const storeLog = async (callSid: string) => {
        try {
            console.log(callSid);
        } catch (err) {
            console.log("Error", err);
        }
    };

    const handleCall = async (phone: string) => {
        const params = { To: phone };
        if (!callDevice) {
            console.error("Call device is not initialized.");
            return;
        }
        await callDevice
            .connect({
                params,
                rtcConstraints: {
                    audio: true,
                },
            })
            .then((call) => {
                call.on("accept", async () => {
                    const sid = call?.parameters.CallSid;
                    storeLog(sid);
                    console.log("On Call");
                    setCall(Call);
                });
                call.on("disconnect", async () => {
                    console.log("☎️ call disconnected ⏹️");
                });
                call.on("reject", async () => {
                    console.log("🛑 Call got rejected 🚧");
                });
            });
    };
    const hangCall = async () => {
        Call?.emit("disconnect");
        if (!Call) {
            throw new Error("Call device is not initialized.");
        } else Call?.disconnect();
        setCall(null);
    };

    useEffect(() => {
        initialToken();
    }, []);

    return (
        <div className="p-[55px]">
            <div className="flex justify-between items-start">
                <Card
                    title={title_headings.CONTACTS}
                    count={contactList?.count ?? 0}
                    active={contactList?.active ?? 0}
                    pending={contactList?.pending ?? 0}
                    activeTag="Active"
                    pendingTag="Pending"
                />
                <div className="text-right">
                    <SearchBar
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchName(e.target.value)
                        }
                        placeholder={"Search Contacts"}
                    />
                    <Button
                        content="+ Create Contact"
                        theme="dark"
                        classname="rounded-lg mt-[15px]"
                        onClick={onClick}
                    />
                </div>
            </div>
            <Heading content={title_headings.CONTACTS} classname="my-[40px]" />
            {contactList && (
                <Table
                    columns={ContactList}
                    data={contactList}
                    setOffset={setOffset}
                    name={title_headings.CONTACTS}
                    handleCall={handleCall}
                    hangCall={hangCall}
                    callState={userState}
                />
            )}
        </div>
    );
}

export default Contacts;
