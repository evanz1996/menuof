import React, { useState, useEffect } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import ReactToPrint from 'react-to-print';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import '../orders/Order.css';
import { Card, CardHeader, Row, Modal, Button, Col, Table } from 'reactstrap';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

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
// function printReceipt(id) {
//   console.log(id);
//   console.log('check');
// }
function OrderBSTable(params) {
  console.log(params.data);
  // const [alert, setAlert] = useState(null);
  const [orderStateOptions, setOrderStateOptions] = useState([]);
  const [orderModal, setOrderModal] = useState(false);

  const [columns, setColumns] = useState([
    { dataField: 'strMealThumb', text: '', sort: true },
  ]);

  //Call API endpoint
  let url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const fetchData = async () => {
    const data = await fetch(url);
    const response = await data.json();
    console.log(response.categories);
    // return;
    setOrderStateOptions(response.categories);
  };
  //React Print
  // const printPageRef = useRef(null);
  // this function will copy to clipboard an entire table,
  // so you can paste it inside an excel or csv file
  const copyToClipboardAsTable = (el) => {
    var body = document.body,
      range,
      sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
      document.execCommand('copy');
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
      range.execCommand('Copy');
    }
    this.setState({
      alert: (
        <ReactBSAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title="Good job!"
          onConfirm={() => this.setState({ alert: null })}
          onCancel={() => this.setState({ alert: null })}
          confirmBtnBsStyle="info"
          btnSize=""
        >
          Copied to clipboard!
        </ReactBSAlert>
      ),
    });
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
      {/* <Container className="mt--6" fluid> */}
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

        <div className="modal-body">
          <Row>
            <Col sm="6">Payment: test101</Col>
            <Col sm="6">Payment: test101</Col>
          </Row>
          <Row>
            <Col sm="6"> First name: test101</Col>
            <Col sm="6">Address: test101</Col>
          </Row>
          <Row>
            <Col sm="6">Phone number: test101</Col>
            <Col sm="6">Email-Address: test101</Col>
          </Row>
          <Table className="align-items-center" responsive id="react-bs-table">
            <thead className="thead-light">
              <tr>
                <th scope="col">Qty</th>
                <th scope="col">Order</th>
                <th scope="col">Price</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> 1</td>
                <td>2 </td>
                <td>300 </td>
                <td>600 </td>
              </tr>
            </tbody>
            Subtotal: 600 <br />
            Delivery costs: 50
            <br /> Discount (Card): 0 Total 650
            <br />
          </Table>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setOrderModal(false)}
          >
            Close
          </Button>
          <Button
            color="primary"
            type="button"
            onClick={() =>
              copyToClipboardAsTable(document.getElementById('react-bs-table'))
            }
            id="copy-tooltip"
          >
            Print
          </Button>
        </div>
      </Modal>
      {/* </Container> */}
    </>
  );
}

export default OrderBSTable;
