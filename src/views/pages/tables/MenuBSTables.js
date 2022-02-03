import React, { useState, useEffect } from 'react';
// react plugin that prints a given react component
import ReactToPrint from 'react-to-print';
// react component for creating dynamic tables
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
// react component used to create sweet alerts
import ReactBSAlert from 'react-bootstrap-sweetalert';
// reactstrap components
import { Card, CardHeader, Container, Row } from 'reactstrap';
// core components
import SimpleHeader from 'components/Headers/SimpleHeader.js';

import { dataTable } from 'variables/general';

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

function MenuBSTables(column, data) {
  const [alert, setAlert] = React.useState(null);
  const [columnNames, setColumn] = React.useState(column.column);
  const [menus, setMenu] = useState({});
  const componentRef = React.useRef(null);
  console.log(menus);
  useEffect(() => {
    // setColumn(column.column);
    setMenu(data);
  }, [data]);
  console.log(menus);
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
    setAlert(
      <ReactBSAlert
        success
        style={{ display: 'block', marginTop: '-100px' }}
        title="Good job!"
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="info"
        btnSize=""
      >
        Copied to clipboard!
      </ReactBSAlert>
    );
  };
  const column1 = [
    { dataField: columnNames[0], text: columnNames[0] },
    { dataField: columnNames[1], text: columnNames[1] },
    { dataField: columnNames[2], text: columnNames[2] },
  ];
  const menus1 = [
    {
      idMeal: '52771',
      strMeal: 'Spicy Arrabiata Penne',
      strDrinkAlternate: '432',
    },
    {
      idMeal: '22',
      strMeal: 'Vans',
      strDrinkAlternate: '323',
    },
  ];

  return (
    <>
      {alert}
      <SimpleHeader name="React Tables" parentName="Tables" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Dishes</h3>
                <p className="text-sm mb-0">
                  This is an exmaple of data table using the well known
                  react-bootstrap-table2 plugin. This is a minimal setup in
                  order to get started fast.
                </p>
              </CardHeader>
              {/* {columnNames.map((columnName, index) => (
                // <h1> I am here</h1>
                <span key={index}> {columnName}</span>
              ))} */}

              <ToolkitProvider
                keyField="idMeal"
                data={menus1}
                columns={column1}
                search
              >
                {(props) => (
                  <div>
                    <h3>Input something at below input field:</h3>
                    <SearchBar {...props.searchProps} />
                    <hr />
                    <BootstrapTable {...props.baseProps} />
                  </div>
                )}
              </ToolkitProvider>
              {/* <ToolkitProvider
                // key={index}
                data={dataTable}
                keyField="name"
                columns={[
                  {
                    dataField: 'name',
                    text: 'Name',
                    sort: true,
                  },
                  {
                    dataField: 'position',
                    text: 'Position',
                    sort: true,
                  },
                  {
                    dataField: 'office',
                    text: 'Office',
                    sort: true,
                  },
                  {
                    dataField: 'age',
                    text: 'Age',
                    sort: true,
                  },
                  {
                    dataField: 'start_date',
                    text: 'Start date',
                    sort: true,
                  },
                  {
                    dataField: 'salary',
                    text: 'Salary',
                    sort: true,
                  },
                ]}
                search
              >
                {(menus) => (
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
                          {...menus.searchProps}
                        />
                      </label>
                    </div>
                    <BootstrapTable
                      {...menus.baseProps}
                      bootstrap4={true}
                      pagination={pagination}
                      bordered={false}
                    />
                  </div>
                )}
              </ToolkitProvider> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default MenuBSTables;
