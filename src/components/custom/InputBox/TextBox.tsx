import React from "react";

interface AppTextBox {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

function TextBox({ label, value, onChange, disabled }: AppTextBox) {
    return (
        <div className="mb-4 lg:basis-1/5">
            <label className="block text-left text-sm font-medium text-gray-70">{label}</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                disabled={disabled ?? false}
                className="mt-1 block p-2 border-b-[0.5px] border-light-black focus:border-blue-300 focus:outline-none max-lg:w-[325px] min-[320px]:w-full max-md:w-full"
                required
            />
        </div>
    );
}

export default TextBox;
