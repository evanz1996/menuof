import React from 'react';
import './NavBarMenu.css';
import MenuItems from './MenuItems';

const NavBarMenu = ({ items }) => {
  console.log(items);
  return (
    <nav>
      <ul className="menus">
        {items.map((menu, index) => {
          const depthLevel = 0;

          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </nav>
  );
};

export default NavBarMenu;
