import React from "react";

interface AppDatePicker {
    onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
    currentValue: string | number | readonly string[] | undefined;
}

function DatePicker({ onClick, currentValue }: AppDatePicker) {
    return (
        <div className="flex justify-center items-center">
            <div className="shadow-md rounded-lg w-fit max-w-xs p-8 bg-white max-md:w-full">
                <label
                    htmlFor="date-picker"
                    className="block max-md:hidden  text-left text-sm font-medium text-gray-70 pb-4"
                >
                    Select Call Date
                </label>
                <input
                    id="date-picker"
                    type="date"
                    defaultValue={currentValue}
                    onChange={onClick}
                    className="mt-1 block border-b-[0.5px] border-light-black focus:border-none focus:outline-none w-fit max-md:w-full bg-transparent"
                />
            </div>
        </div>
    );
}

export default DatePicker;
