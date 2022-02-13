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
} from 'reactstrap';
import SimpleHeader from 'components/Headers/SimpleHeader.js';
import MenuBSTables from '../tables/MenuBSTables';

function Menu() {
  let [menus, setMenu] = useState([]);

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
  console.log(menus);
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
              <Button
                color="primary"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Edit
              </Button>
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
            </CardBody>
          </Card>
        </Row>
      </Container>
      <Container>
        {/* <NewMenuBSTables column={dataFieldTable} data={menus} /> */}
        <MenuBSTables column={dataFieldTable} data={menus}></MenuBSTables>
      </Container>
    </div>
  );
}

export default Menu;
