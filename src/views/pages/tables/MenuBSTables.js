import React, { useState, useEffect } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Card, CardHeader, Row, Modal, Button } from 'reactstrap';
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
  // const [alert, setAlert] = useState(null);
  const [categoryOptions, setcategoryOptions] = useState([]);
  const [openModal, setopenModal] = useState(false);

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

    const column = [
      {
        dataField: 'strMealThumb',
        text: '',
        formatter: imageFormatter,
        sort: true,
        editable: (content, row, rowIndex, columnIndex) => {
          console.log(content);
        },
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
        dataField: 'strCategory',
        text: params.column[2],
        editor: {
          type: Type.SELECT,

          getOptions: (setOptions) => {
            var list = [];
            categoryOptions.forEach((element) => {
              let listItem = {
                id: element.idCategory,
                value: element.strCategory,
                label: element.strCategory,
              };
              console.log(listItem);
              list.push(listItem);
            });

            setTimeout(() => setOptions(list), 1500);
          },
        },
      },
    ];
    setColumns(column);
  }, [params.data]);

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

  return (
    <>
      {alert}

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
                  <BootstrapTable
                    {...menu.baseProps}
                    bootstrap4={true}
                    pagination={pagination}
                    cellEdit={cellEditFactory({
                      mode: 'click',
                      blurToSave: true,
                    })}
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
    </>
  );
}

export default MenuBSTables;
