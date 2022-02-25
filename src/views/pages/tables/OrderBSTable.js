import React, { useState, useEffect, useRef } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import ReactToPrint from 'react-to-print';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import '../orders/Order.css';
import { Card, CardHeader, Row, Modal, Button, Col, Table } from 'reactstrap';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { useReactToPrint } from 'react-to-print';
import OrderModalBody from '../orders/OrderModalBody';
import ReactToPrint from 'react-to-print';
import MenuBSTables from './MenuBSTables';
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

function OrderBSTable(params) {
  console.log(params.data);
  const [orderStateOptions, setOrderStateOptions] = useState([]);
  const [orderModal, setOrderModal] = useState(false);
  let componentRef = useRef();
  const [hidden, setHidden] = useState(true);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [columns, setColumns] = useState([
    { dataField: 'strMealThumb', text: '', sort: true },
  ]);

  //Call API endpoint
  let url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const fetchData = async () => {
    const data = await fetch(url);
    const response = await data.json();
    console.log(response.categories);
    setOrderStateOptions(response.categories);
  };

  useEffect(() => {
    fetchData();
    const column = [
      {
        dataField: 'idMeal',
        text: '#',
        sort: true,
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            // console.log(column, columnIndex, row, rowIndex);
            console.log(column);
            // setopenModal(true);
          },
        },
      },
      {
        dataField: 'strMeasure1',
        text: 'Orders',
        sort: true,
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            console.log(column, columnIndex, row, rowIndex);
            setOrderModal(true);
          },
        },
      },
      { dataField: 'strIngredient2', text: 'Date', sort: true },
      { dataField: 'strIngredient6', text: 'Delivery', sort: true },
      { dataField: 'strTags', text: 'Area', sort: true },
      { dataField: 'strIngredient3', text: 'Payment', sort: true },
      { dataField: 'strIngredient1', text: 'Total', sort: true },
      {
        dataField: 'strCategory',
        text: 'State',
        editor: {
          type: Type.SELECT,

          getOptions: (setOptions) => {
            console.log('cat');
            var list = [];
            orderStateOptions.forEach((element) => {
              let listItem = {
                id: element.idMeals,
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

  return (
    <>
      <Row>
        <div className="col">
          <Card>
            <CardHeader>
              <h3 className="mb-0">Orders</h3>
              <p className="text-sm mb-0 wrap-overlap">
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
        isOpen={orderModal}
        toggle={() => setOrderModal(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Delivery
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setOrderModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
          <strong>Delivery: test101</strong>
        </div>

        <OrderModalBody ref={(el) => (componentRef = el)} />

        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setOrderModal(false)}
          >
            Close
          </Button>
          <ReactToPrint
            trigger={() => (
              <Button
                color="primary"
                type="button"
                // onClick={() => handlePrint}
                id="printPage"
              >
                Print
              </Button>
            )}
            content={() => componentRef}
          />
        </div>
      </Modal>
      {/* </Container> */}
    </>
  );
}

export default OrderBSTable;
