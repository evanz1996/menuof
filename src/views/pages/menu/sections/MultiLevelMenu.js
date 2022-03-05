import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import './MultilevelMenu.css';
function MultiLevelMenu({ items }) {
  const [displayChildren, setDisplayChildren] = useState({});
  const [activeSelected, setActiveSelected] = useState('style');
  console.log('displayChildren', displayChildren);
  const Selected = (id, item, e) => {
    console.log('ID HELLOOOO', id);
    setDisplayChildren({
      ...displayChildren,
      [item.name]: !displayChildren[item.name],
    });
    setActiveSelected('segmentsList');
  };

  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.uid}>
            <Button
              className={activeSelected}
              onClick={(e) => {
                Selected(item.uid, item, e);
              }}
            >
              {item.name}
            </Button>
            {displayChildren[item.name] && item.menu && (
              <MultiLevelMenu items={item.menu} />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default MultiLevelMenu;
