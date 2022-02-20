import React, { useState, useEffect } from 'react';
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
import MenuForm from '../menu/MenuForm';

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

const { SearchBar } = Search;

function MenuBSTables(params) {
  console.log('params', params.data);
  // const [alert, setAlert] = useState(null);
  const [categoryOptions, setcategoryOptions] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setselectedId] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [menus, setMenu] = useState([]);
  // this.state = { selected: [0, 1] };

  const [columns, setColumns] = useState([
    { dataField: 'strMealThumb', text: '', sort: true },
    { dataField: 'idMeal', text: '', sort: true },
    { dataField: 'strMeal', text: '', sort: true },
    { dataField: 'strCategory', text: '' },
  ]);

  let url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const fetchData = async () => {
    const data = await fetch(url);
    const response = await data.json();
    setcategoryOptions(response.categories);
  };

  useEffect(() => {
    fetchData();
    setMenu(params.data);

    const column = [
      {
        dataField: 'strMealThumb',
        text: '',
        formatter: imageFormatter,
        sort: true,
        editable: (content, row, rowIndex, columnIndex) => {},
      },
      {
        dataField: 'idMeal',
        text: params.column[0],
        sort: true,
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            console.log(column, columnIndex, row, rowIndex);
            setopenModal(true);
          },
        },
      },
      { dataField: 'strMeal', text: params.column[1], sort: true },

      {
        dataField: 'delete',
        text: 'Delete',
        sort: false,
        formatter: deleteFormatter,
        // headerAttrs: { width: 50 },
        attrs: { width: 50, className: 'DeleteRow' },
      },
    ];
    setColumns(column);
  }, []);

  function imageFormatter(cell, row) {
    return (
      <a
        className="avatar avatar-xl  rounded-circle"
        href="#pablo"
        onClick={(e) => e.preventDefault()}
      >
        <img alt="..." src={cell} />
      </a>
    );
  }

  function selectedRowsTry(data) {
    console.log('data form function', data);
    return data;
  }
  const deleteSelectedRows = () => {
    console.log(selected);
    console.log('params.data', params.data);
    // let url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    // const fetchData = async () => {
    //   const data = await fetch(url);
    //   const response = await data.json();
    //   setcategoryOptions(response.categories);
    // };
    // menus = params.data;
    // const newMenu = menus.filter((menu) => menu.idMeal === selected);
    // console.log(newMenu);
    // console.log(menu);
  };

  let selectedRow = [];
  const handleOnSelect = (row, isSelect) => {
    console.log('handleOnSelect');
    console.log(row.idMeal, isSelect);
    console.log('selectedRow', row.idMeal);
    setSelected((arr) => [...arr, row.idMeal]);
  };

  console.log('check', selected);
  let removeRepeated = [];
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

  // params.func(removeRepeated);
  console.log('removeRepeated', removeRepeated);

  function deleteFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div
        style={{ textAlign: 'center', cursor: 'pointer', lineHeight: 'normal' }}
      >
        <Button onClick={(e) => DeleteHandler(row)}> Delete </Button>
      </div>
    );
  }

  const DeleteHandler = (row) => {
    console.log('here at confirm delete');
    console.log(row.idMeal);
    setselectedId(row.idMeal);
    setDeleteModal(true);
  };

  const confirmDeleteHandler = (e) => {
    console.log('confirmDeleteHandler');
    console.log('selectedId', selectedId);
    setDeleteModal(false);
  };

  return (
    <>
      <Row>
        <div className="col">
          <Card>
            <CardHeader>
              <h3 className="mb-0">Dishes</h3>
              <p className="text-sm mb-0">
                This is an exmaple of data table using the well known
                react-bootstrap-table2 plugin. This is a minimal setup in order
                to get started fast.
              </p>
            </CardHeader>

            <ToolkitProvider
              keyField="idMeal"
              data={params.data}
              columns={columns}
              search
              dataFormat={imageFormatter}
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
                  />
                </div>
              )}
            </ToolkitProvider>
          </Card>
        </div>
      </Row>
      {/* Modal */}
      <Modal
        size="lg"
        isOpen={openModal}
        toggle={() => setopenModal(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-header">
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setopenModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <MenuForm></MenuForm>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setopenModal(false)}
          >
            Close
          </Button>
          <Button color="primary" type="button">
            Save changes
          </Button>
        </div>
      </Modal>

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
    </>
  );
}

export default MenuBSTables;
