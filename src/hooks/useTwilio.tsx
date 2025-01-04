import { Device } from "@twilio/voice-sdk";
import { useEffect,useState } from "react";
import { toast } from "sonner";

import API from "../services/api";

function useTwilio() {
    const [device, setDevice] = useState<Device | null>(null);

    useEffect(() => {
        const init = async () => {
            try {
                const { data, status } = await API.getTwilioToken();

                if (status !== 200) {
                    toast.error("Failed to fetch token for calls");
                    return;
                }

                const token = data;
                const newDevice = new Device(token, {
                    debug: true,
                    answerOnBridge: true,
                    codecPreferences: ["opus", "pcmu"],
                });

                newDevice.register();
                setDevice(newDevice);

                // Handle microphone permissions
                const micStatus = await navigator.permissions.query({ name: "microphone" });
                if (micStatus.state === "denied") {
                    toast.warning("Microphone access is denied. Please enable it for this website");
                }

                // Add event listeners
                newDevice.addListener("connect", (device: Device) => {
                    // Handle connection event (e.g., display UI updates)
                    console.log("Device connected:", device);
                    return device;
                });

                newDevice.addListener("error", (error) => {
                    console.error("Device error:", error);
                });

                return () => {
                    // Cleanup on component unmount
                    newDevice.destroy();
                    setDevice(null);
                };
            } catch (error) {
                console.error("Error initializing Twilio Device:", error);
                toast.error("Error initializing Twilio Device");
            }
        };

        init();
    }, []);

    return device;
}

export default useTwilio;
