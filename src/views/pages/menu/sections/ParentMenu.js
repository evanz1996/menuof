import React from 'react';
import { Dropdown, Input } from 'reactstrap';
function ParentMenu({ items }) {
  console.log('menu', items);
  return (
    <>
      <Input
        type="select"
        name="select"
        id="menuSection"

        // onChange={(e) => setSelectedValue(e.target.value)}
        // value={selectedValue}
      >
        {items.map((menu, index) => {
          return (
            <option key={menu.uid} value={menu.uid}>
              {/* {menu.name} */}
              <ParentMenu items={menu} key={index}></ParentMenu>;
            </option>
          );
        })}
      </Input>
      {/* <li className="menu-items">
        {items.menu ? (
          <>
            <button type="button" aria-haspopup="menu">
              {items.menu}{' '}
            </button>
            <Dropdown submenus={items.menu} />
          </>
        ) : (
          <a href="/#">{items.title}</a>
        )}
      </li> */}
    </>
  );
}

export default ParentMenu;
