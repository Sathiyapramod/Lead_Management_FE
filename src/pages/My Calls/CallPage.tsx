import React, { useEffect, useState } from "react";
import CustomCard from "../../components/custom/CustomCard";
import DatePicker from "../../components/custom/Datepicker";
import { useAppDispatch, useTypedSelector } from "../../store";
import { fetchCallLogs } from "../../store/reducers/calls";
import API from "../../services/api";
import { Device } from "@twilio/voice-sdk";
import { toast } from "sonner";
import Heading from "../../components/Heading";
import Table from "../../components/custom/Table/Table";
import { CallSchedule } from "../../utils/constants";
import { title_headings } from "../../utils/headings";

interface TwilioCall {
    on(event: "accept", callback: () => void): void;
    on(event: "disconnect", callback: () => void): void;
    on(event: "error", callback: (error: Error) => void): void;
    disconnect(): void;
    reject(): void;
    parameters: {
        CallSid?: string;
        [key: string]: unknown;
    };
}

type CallState = TwilioCall | null;

function CallPage(): React.ReactNode {
    const dispatch = useAppDispatch();

    const [date, setDate] = useState<Date>(new Date());
    const [callDevice, setDevice] = useState<Device | undefined>(undefined);
    const [userState, setUserState] = useState<string>("Idle");
    const [Call, setCall] = useState<CallState>(null);
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
        dispatch(fetchCallLogs({ date: date.toString(), offset: String(offset) }));
    }, [date, offset]);

    const { callSchedule } = useTypedSelector((state) => state.calls);

    const initialToken = async () => {
        try {
            const { data, status } = await API.getTwilioToken();
            if (status !== 200) toast.error("Failed to fetch token for calls");
            else {
                const token = data;
                const device = new Device(token, {
                    logLevel: 4,
                    timeout: 20000,
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
                setCall(Call);
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

    const handleCall = async (phone: string) => {
        const params = { To: phone };
        if (!callDevice) {
            console.error("Call device is not initialized.");
            return;
        }
        await callDevice.connect({
            params,
            rtcConstraints: {
                audio: true,
            },
        });
    };
    const hangCall = async () => {
        if (!Call) {
            console.error("Call device is not initialized.");
            return;
        }
        callDevice?.disconnectAll();
    };

    useEffect(() => {
        initialToken();
    }, []);

    return (
        <div className="p-[55px]">
            <div className="flex flex-row max-sm:flex-col justify-between items-start max-sm:gap-[15px]">
                <CustomCard
                    total={callSchedule.count}
                    completed={callSchedule.completed}
                    pending={Number(callSchedule.count - callSchedule.completed)}
                />
                <DatePicker
                    onClick={(e) => {
                        setDate(new Date(e.target.value));
                    }}
                    currentValue={new Date().toISOString()}
                />
            </div>
            <Heading content={title_headings.CALLS} classname="my-[40px]" />
            <Table
                data={callSchedule}
                columns={CallSchedule}
                setOffset={setOffset}
                name={title_headings.CALLS}
                callState={userState}
                handleCall={handleCall}
                hangCall={hangCall}
            />
        </div>
    );
}

export default CallPage;
