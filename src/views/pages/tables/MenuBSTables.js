import React, { useState, useEffect } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import ReactToPrint from 'react-to-print';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import { Card, CardHeader, Container, Row } from 'reactstrap';
import SimpleHeader from 'components/Headers/SimpleHeader.js';
import { dataTable } from 'variables/general';

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

function MenuBSTables(params) {
  const [alert, setAlert] = React.useState(null);
  const [columnNames, setColumn] = React.useState(params.column);
  const componentRef = React.useRef(null);
  console.log(params.data);

  // this function will copy to clipboard an entire table,
  // so you can paste it inside an excel or csv file
  const options = async () => {
    console.log('here at options');
    let url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    //   const fetchData = async () => {
    const data = await fetch(url);
    const response = await data.json();
    console.log(response.categories);
    return response.categories;
    //   };
  };

  options();

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

  const column = [
    { dataField: 'strMealThumb', formatter: imageFormatter, sort: true },
    { dataField: 'idMeal', text: columnNames[0], sort: true },
    { dataField: 'strMeal', text: columnNames[1], sort: true },
    {
      dataField: 'type',
      text: 'Job Type',
      editor: {
        type: Type.SELECT,
        options: [
          {
            value: 'A',
            label: 'A',
          },
        ],
      },
    },
  ];

  function imageFormatter(cell, row) {
    return (
      <a
        className="avatar rounded-circle"
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

              <ToolkitProvider
                keyField="idMeal"
                data={params.data}
                columns={column}
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
      </Container>
    </>
  );
}

export default MenuBSTables;
