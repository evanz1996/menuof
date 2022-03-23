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
import axios from 'axios';
function RestaurantDashboard() {
  const [restaurant, setRestaurant] = useState(['restaurant1', 'restaurant2']);
  const [selectedValue, setSelectedValue] = useState(1);
  let dataFieldTable = ['Title', 'Description', 'Action'];
  // useEffect(() => {
  //   let isMounted = true;
  //   // declare the data fetching function
  //   let url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
  //   const fetchData = async () => {
  //     const data = await fetch(url);
  //     const response = await data.json();
  //     if (isMounted) {
  //       setRestaurant(response.meals);
  //     }
  //   };
  //   // call the function
  //   fetchData()
  //     // make sure to catch any error
  //     .catch(console.error);
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://menuof.test/api/resturant-owner/resturants/1',
      headers: {
        Accept: 'application/json',
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NWNlZjU0Yy0wMjJlLTQyMzAtOTYxMi05MTM5Y2UxM2IwOTkiLCJqdGkiOiJiYjA2YTEwZmRjZmI5ZDQwMzgzNTRkZmE1YmJhZmIxYmM0ZjYwMDlmM2JkNTEwNjljOTNjMmUyMmYwZmQxNWRjNTMwNjM0YzFiMjQyNzc5NyIsImlhdCI6MTY0Nzk1NDkxMi43MjcwMzYsIm5iZiI6MTY0Nzk1NDkxMi43MjcwNCwiZXhwIjoxNjc5NDkwOTEyLjcwNTA3Mywic3ViIjoiMSIsInNjb3BlcyI6W119.T_v3b4aBXHS1XpB5t5GUMTFogWDMGpTnLtCraI4GDKk1wg42ksGuBK8qB-i5OpeLl4Hs-HwtHey_MOstaImEth8wqoB0Euv_LAUPAyfNxUKK5rkGBDP4idBguxka84wJ6QHW-CsIbDgtITGZv10el5EQL-zd7cRbDDSZ-oyur1l17C8DivK3vgL21J9OoxfEB-koAKNPJD2_bOAqDhbVDlQnetC5HhMpG2mq9yPEyrfhGzWXnUklqlNMBru2qamzfh7qX1GA00l5yTyBfbDpy0pAYeAyjZsz5fpjs71fZvzeuu7CJE4hOeW2e3L4xuTQTwN3_JKA5NzZJYIATsMFTqPUcI5s82OoNZEMwahQyP_vl-DzMJnF8V080toCy7G5EzXUR1nAcN98diX-ka7bpiItXgwdDNP0ilYwQm2nx1kt8Q-YkqVoTuBkctTaNm5-9yyM5fLXcQUdElAVFi2Omzp9rmW8cwN54Eo8TGAIE6HOsGn00R3X5_H1gmGdp2VytU2fOr9BBxaxwh_mLw9_OZEBvUaWAKJ_ttaNbyu8C0t4PNvQGJBIKsbTEGkOkhFQc2JiuOqn9X90VEFHDBxzDG27ut93utaPRQSwYE3aw5Up3aMNS8QP2l-QDlMlEDYXgHQkpRPerAUjNBBXKzm4bBIDTlMK1BJ-R2Jt8tlWEz0',
      },
    };
    axios(config)
      .then(function (response) {
        console.log('here at axios Restaurant Dash');
        console.log(response.data);
        setRestaurant(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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
