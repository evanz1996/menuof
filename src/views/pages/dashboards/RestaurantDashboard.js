import React, { useState, useEffect } from 'react';
import {
  Card,
  Container,
  Row,
  CardBody,
  CardText,
  CardTitle,
  Input,
  Modal,
} from 'reactstrap';
import SimpleHeader from 'components/Headers/SimpleHeader.js';
import RestaurantTable from '../restaurant/RestaurantTable';
function RestaurantDashboard() {
  const [restaurant, setRestaurant] = useState(['restaurant1', 'restaurant2']);
  const [selectedValue, setSelectedValue] = useState(1);
  let dataFieldTable = ['Title', 'Description', 'Action'];
  useEffect(() => {
    // declare the data fetching function
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
    const fetchData = async () => {
      const data = await fetch(url);
      const response = await data.json();
      setRestaurant(response.meals);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <div>
      <SimpleHeader name="" parentName="Restaurant Management" />
      <Container className="mt--6" fluid>
        <Row>
          <Card>
            <CardBody>
              <CardTitle className="mb-3" tag="h3">
                Restaurant
              </CardTitle>
              <CardText className=" wrap-overlap">
                lorem ipsum For the dropdown Below, please select a restaurant
                to view/modify the menus of the selected restaurant
                <br></br>
              </CardText>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                onChange={(e) => setSelectedValue(e.target.value)}
                value={selectedValue}
              >
                <option value={0}>Select</option>
                <option value={1}>Option 1</option>
                <option value={2}>Option 2</option>
                <option value={3}>Option 3</option>
                <option value={4}>Option 4</option>
                <option value={5}>Option 5</option>
              </Input>
            </CardBody>
          </Card>
        </Row>
      </Container>
      <Container>
        <RestaurantTable
          column={dataFieldTable}
          data={restaurant}
        ></RestaurantTable>
      </Container>
    </div>
  );
}

export default RestaurantDashboard;
