import React, { useState, useEffect, useRef } from 'react';
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
import DishModal from '../menu/dish/DishModal';
import NotificationAlert from 'react-notification-alert';
import ImageUploader from 'react-images-upload';
function ModalMenu({ handleClose, show, children }) {
  const [dishModal, setDishModal] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');
  const [selectedSubMenu, setSelectedSubMenu] = useState('');
  const [selectedSubSubMenu, setSelectedSubSubMenu] = useState('');
  const [uploadImage, setUploadImage] = useState('');
  const [menu, setMenu] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    price: '',
  });
  const notifAlert = useRef(null);
  const notify = (place, message, type) => {
    console.log('im here');
    let options = {
      place: place,
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            Attention
          </span>
          <span data-notify="message">{message}</span>
        </div>
      ),
      type: type,
      icon: 'ni ni-bell-55',
      autoDismiss: 7,
    };
    notifAlert.current.notificationAlert(options);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit', uploadImage);
    let token = localStorage.getItem('token');
    var data = {
      food_option_id: null,
      index: null,
      name: title,
      price: price,
      status: 1,
    };
    fetch('http://menuof.test/api/resturant-owner/menus/1/items', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message) {
          setErrors({
            name: result.errors.name,
            price: result.errors.price,
          });
          notify('tr', 'Failed to Add!', 'danger');
        } else {
          console.log('MENUS', result);
          notify('tr', 'successfully Added!', 'success');
        }
      });
  };
  console.log('selectedMenu', selectedMenu);

  const onDrop = (pictureFiles) => {
    console.log('hello', pictureFiles);
    setUploadImage(pictureFiles);
  };
  const checkClose = () => {
    console.log('checkClose');
    return handleClose;
  };
  return (
    <div>
      <Modal
        size="lg"
        isOpen={show}
        toggle={() => handleClose}
        className="modal-dialog-centered modal-secondary"
      >
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
                    {errors.name && errors.name !== undefined && (
                      <span className="errorMessage">{errors.name}</span>
                    )}
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
                    {errors.price && errors.price !== undefined && (
                      <span className="errorMessage">{errors.price}</span>
                    )}
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
                    {/* <Input
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
                  </Input> */}

                    {/* <Input
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
                  </Input> */}

                    {/* <Input
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
                  </Input> */}

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
                {/* <Col lg="6">
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
              </Col> */}
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label htmlFor="exampleFormControlSelect1">
                      Variations
                    </label>
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

              <ImageUploader
                withIcon={false}
                withPreview={true}
                buttonText="Choose images"
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
              />
              <Button color="primary" type="submit">
                Add Section
              </Button>
            </Form>
          </CardBody>
        </Card>
        <div className="modal-footer">
          {/* <button type="button" onClick={checkClose()}>
            Close
          </button> */}
          {/* <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={handleClose}
          >
            Close
          </Button> */}
        </div>
      </Modal>
      <div className="rna-wrapper">
        <NotificationAlert ref={notifAlert} />
      </div>
    </div>
  );
}

export default ModalMenu;
