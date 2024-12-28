import React from "react";

interface AppSearchBar {
    onChange: () => void;
    placeholder: string;
}

function SearchBar({ onChange, placeholder }: AppSearchBar) {
    return (
        <input
            type="text"
            autoComplete="true"
            onChange={onChange}
            placeholder={placeholder}
            className="block w-fit px-4 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
    );
}

export default SearchBar;
