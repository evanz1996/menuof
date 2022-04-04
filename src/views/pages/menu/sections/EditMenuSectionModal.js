import React, { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  Button,
  Modal,
  CardBody,
  CardText,
} from 'reactstrap';
import axios from 'axios';
import NavBarMenu from './NavBarMenu';
import { useDispatch, useSelector } from 'react-redux';
const EditMenuSectionModal = () => {
  const [editModal, setEditModal] = useState(false);
  const menuId = useSelector((state) => state.currentMenuSelectedReducer);
  const id = useSelector((state) => state.currentRestaurantReducer);
  console.log('IIIID', id.payload);
  let selectedMenu = menuId['payload'];
  const [newSection, setNewSection] = useState('');
  const [description, setDescription] = useState('');
  const [fromAvailability, setFromAvailability] = useState('');
  const [toAvailability, setToAvailability] = useState('');

  useEffect(() => {
    let mounted = true;
    console.log('here at EditMenuSectionModal');
    getData();
    return () => (mounted = false);
  }, []);

  const getData = () => {
    console.log('id', menuId);
    console.log(
      'url',
      `http://menuof.test/api/resturant-owner/resturant/${id.payload}/menus/${selectedMenu}`
    );
    let token = localStorage.getItem('token');
    var config = {
      method: 'get',
      url: `http://menuof.test/api/resturant-owner/resturant/${id.payload}/menus/${selectedMenu}`,
      // url: `http://menuof.test/api/resturant-owner/resturant/2/menus/2`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log('here at axios NavBar Menu Dash');
        console.log('EditMenu Section', response.data);
        console.log('EditMenu Section', response.data.name);
        setNewSection(response.data.name);
        setDescription(response.data.description);
        setFromAvailability(response.data.availability);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function updateHandler(event) {
    console.log('updateHandler', event);
    event.preventDefault();
    const data = JSON.stringify({
      resturant_id: 1,
      // // parent_id: parent_id,
      parent_id: 1,
      name: newSection,
      description: description,
      availability: fromAvailability,
    });

    var config = {
      method: 'put',
      url: 'http://menuof.test/api/resturant-owner/resturant/1/menus/8',
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NWNlZjU0Yy0wMjJlLTQyMzAtOTYxMi05MTM5Y2UxM2IwOTkiLCJqdGkiOiJlNDJmZjk5MzdlOTQxYTVmNDlmODU3NWU4YjNkODE2MTE3ZjU2NmViN2U2ZGZhMmRmNjNiZDdmMjJlMTExNjliMTJlOWNkN2FkZDUzNmM4YiIsImlhdCI6MTY0ODI2MjcwOC42OTY0MzksIm5iZiI6MTY0ODI2MjcwOC42OTY0NjgsImV4cCI6MTY3OTc5ODcwOC4yODg3NTMsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.nAupJYlqUGFPEeWBPOIzA8vHpYy6QsAjYQZqzPDsfI07xnHea68kNyNi86ObKTT1sxSwwW1q20o1RdZYdpU5gmeExfQbZSm67ruqFjn35dx0T-eGLTu3C8A4tT8NN4nxBWw84lKcEEnxWdfpXwYPJICh7y6Oyb2vzBFAVM7Dh1g4MJ68NDsofVSFhzy36Hb-E1ziPpRAtuC4vMRYlcIH4zLtg2JHWMgfkqiZhYuXxtxTHyPchHrbdpnb4RPQC6Klt7nKzPY5fQ468kQdT5tY3ZeqMp6kbRRMXMmW77j8QaENMhhZtTmjWobBdNte6mW8_YBPdu-JPtrflwigyT5cU0oFZTUX21iW9SD9aUw2ETPCruG0ipcuL8vTI9ZmSlhtP9y_7lpc5rTRmy-e_c_N9z2Xzw1iYNRTeXnhL4-KJe92bkru4zQMQQNoRnBYxDXIe8TRq_q0U9SVM99QxcUjlW1xRhAncRmVMG6r6LugHkquzwEmtysOMuCIQBHkqehZ53JNft0y50PNGZPbB7zulrT-hw3FcfGSo0gFBVtziYxI_dN8GPNqre_J5Z4TvPhmu5zfHZ6BPRcA67g2GenJREK4xjLKVCLGXkmaMxegkInkvBcrUby5tAFxLT4mnYQBHqMy68SZNdJH7RouH3CwPANQJ9w2M8PCfeG74nz8k3c',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log('here at axios Edit Section');
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      <>
        <div>
          <Container className="mt--6" fluid>
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Menu Section {selectedMenu}
            </h5>
            <br></br>
            <Row>
              <Col lg="12">
                <Form onSubmit={updateHandler}>
                  <FormGroup>
                    <label className="form-control-label">
                      Parent Menu Section
                    </label>
                    <Input
                      defaultValue="Salad"
                      id="menuSectionEdit"
                      type="text"
                      // value={newSection}
                      // onChange={(e) => setNewSection(e.target.value)}
                    />
                  </FormGroup>
                  {/* <NavBarMenu items={items}> </NavBarMenu> */}
                  <FormGroup>
                    <label className="form-control-label">
                      Sub Menu Section
                    </label>
                    <Input
                      id="menuSectionEdit"
                      type="text"
                      value={newSection}
                      onChange={(e) => setNewSection(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="example-email-input"
                    >
                      Description
                    </label>
                    <Input
                      id="description"
                      type="text-area"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="example-url-input"
                    >
                      Availability
                    </label>
                    <br></br>
                    <label
                      className="form-control-label"
                      htmlFor="example-url-input"
                    >
                      From
                    </label>
                    <Input
                      id="menuAvailability"
                      type="text"
                      value={fromAvailability ? fromAvailability : ''}
                      onChange={(e) => setFromAvailability(e.target.value)}
                    />
                    <label
                      className="form-control-label"
                      htmlFor="example-url-input"
                    >
                      To
                    </label>
                    <Input id="menuAvailability" type="date" />
                  </FormGroup>
                  <div className="modal-footer">
                    <Button
                      color="secondary"
                      data-dismiss="modal"
                      type="button"
                      onClick={() => setEditModal(false)}
                    >
                      Close
                    </Button>
                    <Button color="primary" type="submit">
                      Save changes
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    </div>
  );
};

export default EditMenuSectionModal;
