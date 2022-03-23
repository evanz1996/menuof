import React, { useState, useEffect, useRef } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {
  Card,
  CardHeader,
  Row,
  Modal,
  Button,
  CardBody,
  Input,
  Container,
  CardTitle,
  CardText,
} from 'reactstrap';
import SimpleHeader from 'components/Headers/SimpleHeader.js';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import NotificationAlert from 'react-notification-alert';
import 'react-notification-alert/dist/animate.css';
const { SearchBar } = Search;
const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <label>
        Show{' '}
        {
          <select
            name="datatable-basic_length"
            aria-controls="datatable-basic"
            className="form-control form-control-sm"
            onChange={(e) => onSizePerPageChange(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        }{' '}
        entries.
      </label>
    </div>
  ),
});
function RestaurantTable(params) {
  console.log('RestaurantTable', params.data);

  // let extractColumn = (arr, column) => arr.params((x) => x[column]);
  // extractColumn();
  let dataFieldTable = ['Title', 'Description', 'Section / Subsection'];
  const [restaurant, setRestaurant] = useState([]);
  const [activateRestaurant, setActivateRestaurant] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState('');
  const [columns, setColumns] = useState([
    { dataField: 'uid', text: '', sort: true },
    { dataField: 'name', text: '', sort: true },
    { dataField: 'slug', text: '', sort: true },
  ]);
  let data = [
    { id: 1, name: 'George', slug: 'Monkey' },
    { id: 2, name: 'Jeffrey', slug: 'Giraffe' },
    { id: 3, name: 'Alice', slug: 'Giraffe' },
    { id: 4, name: 'Alice', slug: 'Tiger' },
  ];
  let url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const fetchData = async () => {
    const data = await fetch(url);
    const response = await data.json();
  };
  const notifAlert = useRef(null);
  const notify = (place, message, type) => {
    console.log('im here');
    let options = {
      place: place,
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            Attention
          </span>
          <span data-notify="message">{message}</span>
        </div>
      ),
      type: type,
      icon: 'ni ni-bell-55',
      autoDismiss: 7,
    };
    notifAlert.current.notificationAlert(options);
  };

  useEffect(() => {
    fetchData();
    setRestaurant(params.data);

    const column = [
      {
        dataField: 'uid',
        text: 'ID',
        sort: true,
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            console.log(column, columnIndex, row, rowIndex);
          },
        },
      },
      { dataField: 'name', text: 'Name', sort: true },

      {
        dataField: 'slug',
        text: 'Action',
        sort: false,
        formatter: activateFormatter,
        attrs: { width: 50, className: 'DeleteRow' },
      },
    ];
    setColumns(column);
    console.log('columns', columns);
  }, []);
  console.log('restaurant', restaurant);
  console.log('columns', columns);
  function activateFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div
        style={{ textAlign: 'center', cursor: 'pointer', lineHeight: 'normal' }}
      >
        <Button onClick={(e) => activeRestaurantHandler(row)}> Active </Button>
      </div>
    );
  }

  const activeRestaurantHandler = (row) => {
    console.log('here at confirm activate');
    console.log(row.idMeal);
    console.log(row.strMeal);
    // setselectedId(row.idMeal);
    let message = 'Restaurant '`${row.strMeal}`;
    notify('tr', { message }, 'success');
    setCurrentRestaurant(row.idMeal);
  };
  console.log(currentRestaurant);
  return (
    <div>
      <SimpleHeader name="" parentName="Restaurant Management" />

      <Container className="mt--6" fluid>
        <Row>
          <Card>
            <CardHeader>
              <ToolkitProvider
                keyField="id"
                data={data}
                columns={columns}
                search
              >
                {(data) => (
                  <div className="py-4 table-responsive">
                    <div
                      id="datatable-basic_filter"
                      className="dataTables_filter px-4 pb-1"
                    >
                      <label>
                        Search:
                        <SearchBar
                          className="form-control-sm"
                          placeholder=""
                          {...data.searchProps}
                        />
                      </label>
                    </div>

                    <BootstrapTable
                      {...data.baseProps}
                      bootstrap4={true}
                      pagination={pagination}
                      //   cellEdit={cellEditFactory({
                      //     mode: 'click',
                      //     // blurToSave: true,
                      //   })}
                      //   selectRow={selectRow}
                      bordered={true}
                    />
                  </div>
                )}
              </ToolkitProvider>
            </CardHeader>
          </Card>
        </Row>
      </Container>
      <div className="rna-wrapper">
        <NotificationAlert ref={notifAlert} />
      </div>
      <Modal
        isOpen={activateRestaurant}
        toggle={() => setActivateRestaurant(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-header">
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setActivateRestaurant(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="py-3 text-center">
            <i className="ni ni-bell-55 ni-3x" />
            {/* <h4 className="heading mt-4">You should read this!</h4> */}
            <p> Redirecting to other own restaurant</p>
          </div>
        </div>

        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setActivateRestaurant(false)}
          >
            Close
          </Button>
          <Button color="primary" type="button">
            Save changes
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default RestaurantTable;
