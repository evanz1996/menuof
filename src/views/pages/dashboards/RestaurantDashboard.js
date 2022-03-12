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
      <RestaurantTable
        column={dataFieldTable}
        data={restaurant}
      ></RestaurantTable>
    </div>
  );
}

export default RestaurantDashboard;
