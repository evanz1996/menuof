import React, { useState } from 'react';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  Button,
  Card,
  CardBody,
  CardText,
  Modal,
  Dropdown,
} from 'reactstrap';
import VariationModalForm from '../variation/VariationModalForm';
import { items } from 'json/restaurantMenu';

const parentMenu = {
  categoryName: 'Select Menu ...',
};
const subMenu = {
  productName: 'Select SubMenu ...',
};
const subSubMenu = {
  orderName: 'Select   ...',
};
function DishModal() {
  const [dishModal, setDishModal] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');
  const [selectedSubMenu, setSelectedSubMenu] = useState('');
  const [selectedSubSubMenu, setSelectedSubSubMenu] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log('selectedMenu', selectedMenu);

  const [menu, setMenu] = useState('');
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          New Dish
        </h5>
      </div>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg="9">
                <FormGroup>
                  <label className="form-control-label"> Title</label>
                  <Input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <label className="form-control-label"> Price</label>
                  <Input
                    type="number"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <FormGroup>
                  <label className="form-control-label"> Description</label>
                  <Input
                    type="text-area"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <Input
                    className="inputBrand"
                    type="select"
                    name="carbrand"
                    id="carBrand"
                    onChange={(e) => setSelectedMenu(e.target.value)}
                    // onChange={setSelectedMenu}
                  >
                    <option>Choose Menu Sections</option>
                    {items.map((menu, index) => {
                      return <option key={menu.uid}>{menu.name}</option>;
                    })}
                  </Input>

                  <Input
                    className="inputBrand"
                    type="select"
                    name="carmodel"
                    id="carModel"
                    onChange={(e) => setSelectedSubMenu(e.target.value)}
                  >
                    <option>Choose Sub Menu</option>
                    {items.map((menu, index) => {
                      if (menu.name === selectedMenu) {
                        return menu.menu.map((submenu, index) => {
                          return (
                            <option key={submenu.uid}>{submenu.name}</option>
                          );
                        });
                      }
                    })}
                  </Input>

                  <Input
                    className="inputBrand"
                    type="select"
                    name="subSubMenu"
                    id="subSubMenu"
                    onChange={(e) => setSelectedSubSubMenu(e.target.value)}
                  >
                    <option>Choose Sub Sub Menu</option>
                    {items.map((menu, index) => {
                      menu.menu.map((submenu, index) => {
                        // submenu.name.map((subSubmenu, index) => {
                        //   if (subSubmenu.name === selectedSubSubMenu) {
                        //     return (
                        //       <option key={subSubmenu.uid}>
                        //         {subSubmenu.name}
                        //       </option>
                        //     );
                        //   }
                        // });
                      });
                    })}
                  </Input>

                  {/* 
                  <label htmlFor="exampleFormControlSelect1">
                    Menu Section
                  </label>
                  <Input id="exampleFormControlSelect1" type="select">
                    <option>Red Pizzas</option>
                    <option>Promo of the day</option>
                    <option>Side Dishes</option>
                    <option>BrushCetta</option>
                    <option>5</option>
                  </Input> */}
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label htmlFor="exampleFormControlSelect1">Sub Section</label>
                  <Input id="exampleFormControlSelect1" type="select">
                    <option>Nesunna</option>
                    <option>Normal</option>
                    <option>Whole grain</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label htmlFor="exampleFormControlSelect1">Variations</label>
                  <Input id="exampleFormControlSelect1" type="select">
                    <option>Menu of the day</option>
                    <option>Sauces</option>
                    <option>Dough + Ingredients</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Button onClick={() => setopenModal(true)}>
                    Add Variations
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <Modal
        size="lg"
        isOpen={openModal}
        toggle={() => setopenModal(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-header">
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setopenModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <VariationModalForm />
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            // onClick={() => addVariation}
          >
            Close
          </Button>
          <Button color="primary" type="button">
            Save changes
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default DishModal;
