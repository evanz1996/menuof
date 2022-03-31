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
} from 'reactstrap';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import NotificationAlert from 'react-notification-alert';
import 'react-notification-alert/dist/animate.css';
const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <label>
        Show
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
        }
        entries.
      </label>
    </div>
  ),
});
const { SearchBar } = Search;

function RestaurantTable(params) {
  console.log('RestaurantTable', params);
  const [openModal, setopenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedId, setselectedId] = useState('');
  const [columns, setColumns] = useState([
    { dataField: 'images', text: 'Images', sort: true },
    { dataField: 'name', text: 'Name' },
    { dataField: 'status', text: 'Status', sort: true },
    { dataField: '', text: 'Action' },
  ]);
  let isMounted = true;
  useEffect(() => {
    const column = [
      {
        dataField: 'images',
        text: 'Images',
        // formatter: imageFormatter,
        sort: true,
        // editable: (content, row, rowIndex, columnIndex) => {},
      },
      {
        dataField: 'name',
        text: 'Name',
        sort: true,
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            console.log(column, columnIndex, row, rowIndex);
            setopenModal(true);
          },
        },
        // filter: textFilter({
        //   defaultValue: selectedmenusection,
        // }),
      },
      { dataField: 'description', text: 'Description', sort: true },

      {
        dataField: 'delete',
        text: 'Delete',
        sort: false,
        attrs: { width: 50, className: 'DeleteRow' },
        formatter: deleteFormatter,
      },
    ];
    setColumns(column);
    var input = document.getElementById('text-filter-column-idMeal');
    var inputVal = '';
    if (input) {
      inputVal = input.value;
      console.log(inputVal);
    }
    return () => {
      isMounted = false;
    };
  }, []);
  let selectedRow = [];
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
  const handleOnSelect = (row, isSelect) => {
    console.log('handleOnSelect');
    console.log(row.uid, isSelect);
    console.log('selectedRow', row.uid);
    setSelected((arr) => [...arr, row.uid]);
  };
  const deleteSelectedRows = () => {
    console.log('params.data', params.data);
  };
  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    // selected: selected,
    onSelect: handleOnSelect,
    // classes: (row, rowIndex) => {
    //   selectedRow.push(row.idMeal);
    //   console.log(selectedRow);
    //   const removeRepeatNumbers = (array) => [...new Set(array)];
    //   removeRepeated = removeRepeatNumbers(selectedRow); // [ 1, 21, 34, 12 ]
    //   return removeRepeated;
    //   console.log(removeRepeated, 'removeRepeated');
    // },
  };

  function deleteFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div
        style={{ textAlign: 'center', cursor: 'pointer', lineHeight: 'normal' }}
      >
        <Button color="danger" onClick={(e) => DeleteHandler(row)}>
          Delete
        </Button>
      </div>
    );
  }
  const DeleteHandler = (row) => {
    console.log(row);
    console.log('here at DeleteHandler');
    console.log(row.id);
    setselectedId(row.id);
    setDeleteModal(true);
  };

  const confirmDeleteHandler = (e) => {
    console.log('confirmDeleteHandler');
    console.log('selectedId', selectedId);
    let token = localStorage.getItem('token');
    var config = {
      method: 'DELETE',
      url: `http://menuof.test/api/resturant-owner/resturants/${selectedId}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log('here at DELETE', response);
        if (response.status === 200) {
          setDeleteModal(false);
          notify('tr', 'successfully Deleted', 'success');
          window.location.reload(false);
        }
      })
      .catch(function (error) {
        console.log('here at DELETE', error);
        console.log(error);
        setDeleteModal(false);
        notify('tr', 'Failed to Delete', 'danger');
      });
  };

  return (
    <>
      <Row>
        <div className="col">
          <Card>
            <CardHeader>
              <p className="text-sm mb-0">
                This is an exmaple of data table using the well known
                react-bootstrap-table2 plugin. This is a minimal setup in order
                to get started fast.
              </p>
            </CardHeader>
            <ToolkitProvider
              keyField="uid"
              data={params.data}
              columns={columns}
              search
              //   dataFormat={imageFormatter}
            >
              {(menu) => (
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
                        {...menu.searchProps}
                      />
                    </label>
                  </div>

                  <div className="dataTables_filter px-4 pb-1">
                    <label>
                      <Button onClick={deleteSelectedRows}>Delete</Button>
                    </label>
                  </div>

                  <BootstrapTable
                    {...menu.baseProps}
                    bootstrap4={true}
                    pagination={pagination}
                    cellEdit={cellEditFactory({
                      mode: 'click',
                      // blurToSave: true,
                    })}
                    selectRow={selectRow}
                    bordered={true}
                    filter={filterFactory()}
                  />
                </div>
              )}
            </ToolkitProvider>
          </Card>
        </div>
      </Row>
      {/* Delete Modal */}
      <Modal
        className="modal-dialog-centered modal-danger"
        contentClassName="bg-gradient-danger"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(false)}
      >
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-notification">
            Your attention is required
          </h6>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setDeleteModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="py-3 text-center">
            <i className="ni ni-bell-55 ni-3x" />
            <h4 className="heading mt-4">You should read this!</h4>
            <p>Are you sure you want to delete?</p>
          </div>
        </div>
        <div className="modal-footer">
          <Button
            className="btn-white"
            color="default"
            type="button"
            onClick={() => confirmDeleteHandler()}
          >
            Yes
          </Button>
          <Button
            className="text-white ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={() => setDeleteModal(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
      <div className="rna-wrapper">
        <NotificationAlert ref={notifAlert} />
      </div>
    </>
  );
}

export default RestaurantTable;
