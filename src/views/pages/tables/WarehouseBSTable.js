import React, { useState, useEffect } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Card, CardHeader, Row, Modal, Button } from 'reactstrap';

import cellEditFactory from 'react-bootstrap-table2-editor';

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

function WarehouseBSTables(params) {
  console.log('params.data', params.data);

  const [columns, setColumns] = useState([
    { dataField: '', text: '', sort: true },
  ]);
  let quantity = [1, 2, 45, 6, 90];

  useEffect(() => {
    const column = [
      { dataField: 'strMealThumb', text: 'Products', sort: true },
      {
        dataField: 'strMeasure1',
        text: 'Quantity',
        sort: true,
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
              <h3 className="mb-0">Products</h3>
              <p className="text-sm mb-0">Lists of Products</p>
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
    </>
  );
}

export default WarehouseBSTables;
