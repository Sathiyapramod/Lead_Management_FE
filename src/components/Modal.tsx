import React from "react";

import Button from "./Button";
import Heading from "./Heading";

interface AppModal {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: AppModal) {
    if (!isOpen) return;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-100">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-lg md:max-w-2xl lg:max-w-3xl h-fit py-10">
                <div className="flex justify-start px-10 items-center gap-[10px]">
                    <Button content={"close"} theme={"light"} onClick={onClose} />
                    <Heading content={title} />
                </div>
                <div className="px-10">{children}</div>
            </div>
        </div>
    );
}

export default Modal;
