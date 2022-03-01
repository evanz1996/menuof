import React, { useEffect, useState } from 'react';
import './Menu.css';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Card,
  Container,
  Row,
  CardBody,
  CardText,
  CardTitle,
  Button,
  Input,
  Modal,
  ModalBody,
} from 'reactstrap';
import SimpleHeader from 'components/Headers/SimpleHeader.js';
import MenuBSTables from '../tables/MenuBSTables';
import { useTranslation } from 'react-i18next';
import readXlsxFile from 'read-excel-file';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import * as XLSX from 'xlsx';
import SectionModal from './sections/SectionModal';
import DishModal from './dish/DishModal';
import VariationModalForm from './variation/VariationModalForm';
import SectionForm from './sections/SectionForm';
function Menu() {
  // const [t, i18n] = useTranslation();
  let [menus, setMenu] = useState([]);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [menuSectionsModal, setMenuSectionsModal] = useState(false);
  const [dishModal, setDishModal] = useState(false);
  const [variationModal, setVariationModal] = useState(false);

  useEffect(() => {
    // declare the data fetching function
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
    const fetchData = async () => {
      const data = await fetch(url);
      const response = await data.json();
      setMenu(response.meals);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const deletedSelectedRow = () => {
    console.log('deletedSelectedRow');
  };

  const processData = (dataString) => {
    console.log('dataString1', dataString);
    const dataStringLines = dataString.split(/\r\n|\n/);
    console.log('dataStringLines', dataStringLines);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );
    console.log('headers', headers);

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      console.log('row', row);
      if (headers && row.length == headers.length) {
        console.log('headers, row.length', headers, row.length);
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            console.log('d.length', d.length);
            if (d[0] == '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }
        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
          console.log('list', list);
        }
      }
    }
    // prepare columns list from headers
    const columns = headers.map((c) => ({
      name: c,
      selector: c,
    }));

    setData(list); //data of excel
    setColumns(columns); //columns of excel
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      console.log(data);
      processData(data);
    };
    reader.readAsBinaryString(file);
  };
  const selectedRowsFromTable = (rowsId) => {
    console.log('selectedRowsFromTable', rowsId); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
  };
  let dataFieldTable = ['Title', 'Description', 'Section / Subsection'];

  return (
    <div>
      <SimpleHeader name="" parentName="Menu Management" />
      <Container className="mt--6" fluid>
        <Row>
          <Card>
            <CardBody>
              <CardTitle className="mb-3" tag="h3">
                Menu Sections
              </CardTitle>
              <CardText className="mb-4 wrap-overlap">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facilis non dolore est fuga nobis ipsum illum eligendi nemo iure
                repellat, soluta, optio minus ut reiciendis voluptates enim
                impedit veritatis officiis.
              </CardText>
              {/* <Button
                color="primary"
                href="#pablo"
                onClick={(e) => setMenuSectionsModal(true)}
              >
                Edit
              </Button> */}
              <UncontrolledDropdown>
                <DropdownToggle color="primary">Style</DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Horizontal
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Vertical
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
              />
              <Button
                color="primary"
                href="#pablo"
                onClick={(e) => setMenuSectionsModal(true)}
              >
                Add Section
              </Button>
            </CardBody>
          </Card>
        </Row>
      </Container>

      <Container>
        <h1> Dishes</h1>
        <Button
          color="success"
          href="#pablo"
          onClick={(e) => setDishModal(true)}
        >
          Add
        </Button>
        <Button
          color="success"
          href="#pablo"
          onClick={(e) => setVariationModal(true)}
        >
          Variations
        </Button>
        <MenuBSTables
          column={dataFieldTable}
          data={menus}
          func={selectedRowsFromTable}
        ></MenuBSTables>
      </Container>
      {/* Menu Section Modal */}
      <Modal
        size=""
        isOpen={menuSectionsModal}
        toggle={() => setMenuSectionsModal(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-header">
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setMenuSectionsModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          {/* <SectionModal /> */}
          <SectionForm></SectionForm>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setMenuSectionsModal(false)}
          >
            Close
          </Button>
          <Button color="primary" type="button">
            Save changes
          </Button>
        </div>
      </Modal>
      {/* Dish */}
      <Modal
        size="lg"
        isOpen={dishModal}
        toggle={() => setMenuSectionsModal(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <DishModal></DishModal>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setDishModal(false)}
          >
            Close
          </Button>
          <Button color="primary" type="button">
            Add Section
          </Button>
        </div>
      </Modal>

      {/* Variation */}
      <Modal
        size="lg"
        isOpen={variationModal}
        toggle={() => setVariationModal(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <li> Sauces</li>
        <li> Dough + Ingredients</li>
        <li> Test</li>

        <VariationModalForm />

        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setVariationModal(false)}
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

export default Menu;
