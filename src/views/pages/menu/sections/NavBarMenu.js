import React, { useEffect, useState, useRef } from 'react';
import './NavBarMenu.css';
import MenuItems from './MenuItems';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
const NavBarMenu = ({ items }) => {
  const [menu, setMenu] = useState([]);
  const id = useSelector((state) => state.currentRestaurantReducer);
  console.log('IIIID', id.payload);

  useEffect(() => {
    let mounted = true;
    console.log('here ar useEffect');
    // if (mounted) {
    //   getData();
    // }
    if (localStorage.getItem('token')) {
      console.log('MOUNTED ');
      if (mounted) {
        console.log('MOUNTED 2');
        getData();
      }
    }

    return () => (mounted = false);
  }, []);
  let mounted = true;
  const getData = () => {
    let token = localStorage.getItem('token');
    console.log('id', id);
    let defaultId = id;
    if (id.payload) {
      defaultId = id.payload;
    }
    console.log('defaultId', defaultId);
    var config = {
      method: 'get',
      url: `http://menuof.test/api/resturant-owner/resturant/${defaultId}/menus`,
      // url: 'http://menuof.test/api/resturant-owner/resturants',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log('RESPONSE NAVBAR', response);
        console.log('here at axios NavBar Menu Dash', response.data);
        if (mounted) {
          console.log('i am here mounted');
          setMenu(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log('here ar useEffect');
    if (mounted) {
      getData();
    }

    return () => (mounted = false);
  }, [id]);

  console.log('NavBar Menu', menu);
  return (
    <nav>
      <ul className="menus">
        {menu.map((menu, index) => {
          const depthLevel = 0;

          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </nav>
  );
};

export default NavBarMenu;
