// import React, { useState } from 'react';
// import RestaurantTable from '../restaurant/RestaurantTable';
// import {
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   UncontrolledDropdown,
//   Card,
//   Container,
//   Row,
//   CardBody,
//   CardText,
//   CardTitle,
//   Button,
//   Input,
//   Modal,
// } from 'reactstrap';
// import SimpleHeader from 'components/Headers/SimpleHeader.js';
// function RestaurantDashboard() {
//   const [restaurant, setRestaurant] = useState();
//   let dataFieldTable = ['Title', 'Description', 'Section / Subsection'];

//   return (
//     <div>
//       <SimpleHeader name="" parentName="Restaurant Management" />
//       <Container className="mt--6" fluid>
//         <Row>
//           <Card>
//             <CardBody>
//               <CardTitle className="mb-3" tag="h3">
//                 Restaurant
//               </CardTitle>
//               <CardText className="mb-4 wrap-overlap">
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//                 Facilis non dolore est fuga nobis ipsum illum eligendi nemo iure
//                 repellat, soluta, optio minus ut reiciendis voluptates enim
//                 impedit veritatis officiis.
//               </CardText>
//             </CardBody>
//           </Card>
//         </Row>
//       </Container>
//       <Container>
//         <RestaurantTable
//           column={dataFieldTable}
//           data={restaurant}
//         ></RestaurantTable>
//       </Container>
//     </div>
//   );
// }

// export default RestaurantDashboard;
