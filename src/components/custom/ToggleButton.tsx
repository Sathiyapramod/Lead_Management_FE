import React from "react";

interface AppTextBox {
    label: string;
    value?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ToggleButton({ onChange, value, label }: AppTextBox) {
    return (
        <div className="mb-4 lg:basis-1/5">
            <label className="block text-left text-sm font-medium text-gray-70" htmlFor={label}>
                {label}
            </label>
            <label className="inline-flex items-center cursor-pointer mt-4">
                <input
                    type="checkbox"
                    checked={value}
                    id={label}
                    value={label}
                    className="sr-only peer"
                    onChange={onChange}
                />
                <div className="relative w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
        </div>
    );
}

export default ToggleButton;
