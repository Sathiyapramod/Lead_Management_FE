import React, { useState } from "react";
import { MENU_OPTIONS, MenuOptions } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import MenuLink from "./MenuLink";

function Sidemenu(): React.ReactNode {
    const navigate = useNavigate();
    const [selected, setSelectedId] = useState<number>(1);
    const handleSelect = (menu: MenuOptions) => {
        const { id, path } = menu;
        setSelectedId(id);
        navigate(path);
    };

    return (
        <ul className="ps-[49px]">
            {/* // todo - icons setup for mobile screen */}
            {MENU_OPTIONS.map((menu) => {
                return (
                    <MenuLink
                        key={menu.id}
                        menu={menu}
                        isSelected={selected === menu.id}
                        onSelect={() => handleSelect(menu)}
                    />
                );
            })}
        </ul>
    );
}

export default Sidemenu;
