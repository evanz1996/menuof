import React, { useState, useEffect } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Card, CardHeader, Row } from 'reactstrap';
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
function ReservationBSTable(params) {
  const [categoryOptions, setcategoryOptions] = useState([]);
  const [openModal, setopenModal] = useState(false);

  const [columns, setColumns] = useState([
    { dataField: '', text: '', sort: true },
  ]);

  let url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const fetchData = async () => {
    const data = await fetch(url);
    const response = await data.json();

    setcategoryOptions(response.categories);
  };
  console.log(fetchData);

  useEffect(() => {
    fetchData();

    const column = [
      {
        dataField: 'strMealThumb',
        text: 'Name',
        sort: true,
      },
      {
        dataField: 'idMeal',
        text: 'Date',
        sort: true,
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            console.log(column, columnIndex, row, rowIndex);
            setopenModal(true);
          },
        },
      },
      { dataField: 'strMeal', text: 'Phone', sort: true },
      { dataField: 'strMeasure1', text: 'Phone', sort: true },
      {
        dataField: 'strMeasure3',
        text: 'Phone',
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

  return (
    <div>
      <>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Reservation Lists</h3>
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
    </div>
  );
}

export default ReservationBSTable;
