import React from "react";

import { ManagersList } from "../../../pages/KAM/Manager.types";
import { LeadList } from "../../../pages/Leads/Leads.types";

interface AppSelectBox {
    label: string;
    list?: Partial<ManagersList>[];
    leads?: Partial<LeadList>[];
    value: string;
    defaultValue: string;
    listName: "managers" | "leads";
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
function SelectBox({ label, value, list, onChange, defaultValue, listName, leads }: AppSelectBox) {
    return (
        <div className="mb-4 lg:basis-1/5">
            <label className="block text-left text-sm font-medium text-gray-70">{label}</label>
            <select
                value={value}
                onChange={onChange}
                className="mt-1 block p-2 border-b-[0.5px] border-light-black focus:border-blue-300 focus:outline-none max-lg:w-[325px] min-[320px]:w-full max-md:w-full"
                disabled={false}
                required
            >
                <option value="select">{defaultValue}</option>
                {listName === "managers" &&
                    list &&
                    list.map((eachItem) => (
                        <option value={eachItem.id} key={eachItem.id}>
                            {eachItem.mgr_name}
                        </option>
                    ))}
                {listName === "leads" &&
                    leads &&
                    leads.map((eachItem) => (
                        <option value={eachItem.id} key={eachItem.id}>
                            {eachItem.lead_name}
                        </option>
                    ))}
            </select>
        </div>
    );
}

export default SelectBox;
