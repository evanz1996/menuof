import React, { useState, useEffect } from 'react';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Card,
  Container,
  Row,
  CardBody,
  CardText,
  CardTitle,
  Button,
} from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import SimpleHeader from 'components/Headers/SimpleHeader.js';
import RestaurantTable from '../tables/RestaurantTable';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
function RestaurantDashboard() {
  const [restaurant, setRestaurant] = useState([]);
  const [selectedValue, setSelectedValue] = useState(1);
  let dataFieldTable = ['Title', 'Description', 'Action'];

  let check = document.getElementById('text-filter-column-Menu');
  console.log(check);

  let mounted = true;
  useEffect(() => {
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
      url: 'http://menuof.test/api/resturant-owner/resturants',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log('here at axios Restaurant Dash', response);
        if (mounted) {
          setRestaurant(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log('Restaurant Dashboard', restaurant);

  // const renderMenu = (menu) => {
  //   return menu.map((item, index) => (
  //     <div key={index} style={{ marginLeft: '25px' }}>
  //       <li key={item.id}> {item.title}</li>

  //       {item.child && renderMenu(item.child)}
  //     </div>
  //   ));
  // };

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
    <>
      <div>
        <SimpleHeader name="" parentName="Restaurant Management" />
        <Container className="mt--6" fluid>
          <Row>
            <Card>
              <CardBody>
                <CardTitle className="mb-3" tag="h3">
                  Restaurant
                </CardTitle>
                <CardText className="mb-4 wrap-overlap">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Facilis non dolore est fuga nobis ipsum illum eligendi nemo
                  iure repellat, soluta, optio minus ut reiciendis voluptates
                  enim impedit veritatis officiis.
                </CardText>
                <Button
                  color="primary"
                  href="#pablo"
                  // onClick={(e) => setEditModal(true)}
                >
                  Add Restaurant
                </Button>
              </CardBody>
            </Card>
          </Row>
        </Container>
        <Container>
          <RestaurantTable
            column={dataFieldTable}
            data={restaurant}
          ></RestaurantTable>
          {/* <BootstrapTable
            keyField="id"
            data={restaurant}
            columns={column}
            hover
            pagination={paginationFactory()}
            filter={filterFactory()}
          /> */}
        </Container>
      </div>
    </>
  );
}

export default RestaurantDashboard;
