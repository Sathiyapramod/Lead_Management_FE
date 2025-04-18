import React from "react";

import { MenuOptions } from "../../../config/constants";

interface AppMenuLinks {
  menu: MenuOptions;
  isSelected: boolean;
  onSelect: () => void;
}

function MenuLink({
  menu,
  isSelected,
  onSelect,
}: AppMenuLinks): React.ReactNode {
  return (
    <li
      onClick={onSelect}
      className={`font-light text-medium mb-[30px] transition-colors transition-border duration-500 max-lg:text-sm ${
        isSelected
          ? "text-menu-colors border-menu-colors lg:border-l-8 ps-3 max-[1024px]:border-b-4"
          : "text-black"
      } cursor-pointer`}
    >
      {menu.caption}
    </li>
  );
}

export default MenuLink;
