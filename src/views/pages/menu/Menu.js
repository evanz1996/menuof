import React, { useEffect, useState } from 'react';

import {
  Table,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  CardText,
  CardTitle,
  Button,
} from 'reactstrap';
import SimpleHeader from 'components/Headers/SimpleHeader.js';
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
              <CardText className="mb-4">
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
        <Row>
          <Col xl="5"></Col>
          <Col xl="12">
            <Row>
              <div className="col">
                <Card>
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Dishes</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th className="sort" data-sort="name" scope="col">
                          Title
                        </th>
                        <th className="sort" data-sort="budget" scope="col">
                          Description
                        </th>
                        <th className="sort" data-sort="status" scope="col">
                          Section / Subsection
                        </th>

                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody className="list">
                      {menus.map((menu) => (
                        <tr key={menu.idMeal}>
                          <td>
                            <a
                              className="avatar rounded-circle"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img alt="..." src={menu.strMealThumb} />
                            </a>
                            {menu.strMeal}
                          </td>
                          <td>{menu.strMeal}</td>
                          <td>{menu.strMeal}</td>
                          <td>{menu.strMeal}</td>
                        </tr>
                      ))}
                      {/* {menus.map((item, index) => (
                        <tr key={index}></tr>
                      ))} */}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Menu;
