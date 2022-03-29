import React, { useState, useEffect } from 'react';
import {
  Card,
  Container,
  Row,
  CardBody,
  CardText,
  CardTitle,
  Input,
  Modal,
} from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import SimpleHeader from 'components/Headers/SimpleHeader.js';
import RestaurantTable from '../restaurant/RestaurantTable';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
function RestaurantDashboard() {
  const [restaurant, setRestaurant] = useState([]);
  const [selectedValue, setSelectedValue] = useState(1);
  let dataFieldTable = ['Title', 'Description', 'Action'];
  // useEffect(() => {
  //   let isMounted = true;
  //   // declare the data fetching function
  //   let url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
  //   const fetchData = async () => {
  //     const data = await fetch(url);
  //     const response = await data.json();
  //     if (isMounted) {
  //       setRestaurant(response.meals);
  //     }
  //   };
  //   // call the function
  //   fetchData()
  //     // make sure to catch any error
  //     .catch(console.error);
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  let check = document.getElementById('text-filter-column-Menu');
  console.log(check);
  // let filter = check.value.toUpperCase();
  // console.log(filter);

  console.log(check);

  useEffect(() => {
    console.log('useEffect');
    let mounted = true;
    if (localStorage.getItem('id')) {
      if (mounted) {
        getData();
      }
    }

    return () => (mounted = false);
  }, []);
  const getData = () => {
    console.log('Im here ate GET DATA');
    let token = localStorage.getItem('token');
    var config = {
      method: 'get',
      // url: 'https://jsonplaceholder.typicode.com/comments',
      url: 'http://menuof.test/api/resturant-owner/resturants',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log('here at axios Restaurant Dash');
        console.log(response);
        setRestaurant(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log('Restaurant Dashboard', restaurant);
  const menu = {
    data: [
      {
        id: 1,
        title: 'Home',
        child: [
          {
            id: '1cg',
            title: 'SubLevel1',
            child: [
              {
                title: 'SubSubLevel1',
              },
            ],
          },
          {
            id: '1cg2',
            title: 'SubLevel2',
            child: [
              { id: '1cc', title: 'SubSubLevel1' },
              { id: '2cc', title: 'SubSubLevel2' },
            ],
          },
        ],
      },
      {
        title: 'About',
      },
      {
        title: 'Contact',
      },
    ],
  };
  const renderMenu = (menu) => {
    return menu.map((item, index) => (
      <div key={index} style={{ marginLeft: '25px' }}>
        <li key={item.id}> {item.title}</li>

        {item.child && renderMenu(item.child)}
      </div>
    ));
  };

  const column = [
    { dataField: 'id', text: 'ID', sort: true },
    { dataField: 'name', text: 'Name', sort: true, filter: textFilter() },
    { dataField: 'slug', text: 'Slug', sort: true },
    // {
    //   dataField: 'Menu',
    //   text: 'Menu',
    //   sort: true,
    //   isDummyField: true,
    //   filter: textFilter(),
    //   formatter: (cellContent, row) => {
    //     console.log(row);
    //     console.log(cellContent);
    //     return <div key={menu.id}>{renderMenu(menu.data)}</div>;
    //   },
    // },
    {
      dataField: 'Action',
      text: 'Delete',
      editable: false,
      isDummyField: true,
      formatter: (cellContent, row) => {
        return (
          <button
            className="btn btn-danger btn-xs"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        );
      },
    },
  ];
  const handleDelete = (rowId) => {
    console.log(rowId);
  };
  return (
    <div>
      <BootstrapTable
        keyField="id"
        data={restaurant}
        columns={column}
        hover
        pagination={paginationFactory()}
        filter={filterFactory()}
      />
      {/* <RestaurantTable
        column={dataFieldTable}
        data={restaurant}
      ></RestaurantTable> */}
    </div>
  );
}

export default RestaurantDashboard;
