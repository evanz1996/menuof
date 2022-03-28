import Dropdown from './Dropdown';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMenuId } from 'actions/selectedMenu';
const MenuItems = ({ items, depthLevel }) => {
  console.log('MenuItems', items);
  const [dropdown, setDropdown] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const dispatch = useDispatch();
  const [activeSelected, setActiveSelected] = useState('style');
  var numberOfReRenders = 0;
  // selectedMenuHandler(items.uid);
  function selectedMenuHandler(event, id) {
    setSelectedId(id);
    if (selectedId) {
      console.log('selectedMenuHandler', selectedId);
      dispatch(selectMenuId(selectedId));
      // setDropdown(true);
      setDropdown((prev) => !prev);
      setActiveSelected('segmentsList');
    }
  }
  let ref = useRef();
  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  useEffect(() => {
    console.log('selectedUseSTATE', selectedId);
    dispatch(selectMenuId(selectedId));
  }, [selectedId]);

  function selectedMenuHandler1(itemId) {
    console.log('check', itemId);
  }

  return (
    <li className="menu-items" ref={ref}>
      {items.menu && items.menu.length ? (
        <>
          <button
            className={activeSelected}
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={(event) => selectedMenuHandler(event, items.uid)}
            // onClick={() => setDropdown((prev) => !prev)}
            // onClick={check(items.uid)}
          >
            {items.name}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            submenus={items.menu}
            dropdown={dropdown}
            depthLevel={depthLevel}
          />
        </>
      ) : (
        <button
          className="button"
          onClick={(event) => selectedMenuHandler(event, items.uid)}
        >
          {items.name}
        </button>
      )}
    </li>
  );
};

export default MenuItems;
