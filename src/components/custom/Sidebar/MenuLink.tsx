import React from "react";
import { MenuOptions } from "../../utils/constants";

interface AppMenuLinks {
    menu: MenuOptions;
    isSelected: boolean;
    onSelect: () => void;
}

function MenuLink({ menu, isSelected, onSelect }: AppMenuLinks) {
    return (
        <li
            onClick={onSelect}
            className={`font-light text-medium mb-[30px] transition-colors transition-border duration-500 ${
                isSelected ? "text-menu-colors border-menu-colors border-l-8 ps-3" : "text-black"
            } cursor-pointer`}
        >
            {menu.caption}
        </li>
    );
}

export default MenuLink;
