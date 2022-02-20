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
} from 'reactstrap';
function SectionModal() {
  const [sectionValues, setSectionValues] = useState([{ section: '' }]);
  const [subSectionValues, setSubSectionValues] = useState([
    { subsection: '' },
  ]);

  let addSubSectionFields = () => {
    setSubSectionValues([...subSectionValues, { subsection: '' }]);
  };
  let removeSubSectionFields = (i) => {
    console.log('index', i);
    let newFormValues = [...subSectionValues];
    newFormValues.splice(i, 1);
    setSubSectionValues(newFormValues);
  };
  const addSectionFields = () => {
    console.log('add section');
    setSectionValues([...sectionValues, { section: '' }]);
  };

  let handleSectionChange = (i, e) => {
    let newFormValues = [...sectionValues];
    newFormValues[i][e.target.name] = e.target.value;
    setSectionValues(newFormValues);
  };
  return (
    <div>
      <Container className="mt--6" fluid>
        <h5 className="modal-title" id="exampleModalLabel">
          Menu Section
        </h5>
        <br></br>
        <Row>
          <Col lg="12">
            <Form>
              <Card>
                {sectionValues.map((input, index) => (
                  <div key={index}>
                    <CardBody>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label className="form-control-label">
                              Menu Section
                            </label>
                            {/* <Input required type="text" placeholder="eg: Dough" /> */}
                            <Input
                              type="text"
                              name="name"
                              value={input.groupName || ''}
                              onChange={(e) => handleSectionChange(index, e)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Button
                            className="button add"
                            type="button"
                            color="info"
                            onClick={() => addSubSectionFields()}
                          >
                            Add Subsection
                          </Button>
                        </Col>
                      </Row>
                      <br></br>
                      {subSectionValues.map((element, index) => (
                        <div key={index}>
                          <Row>
                            <Col md="8">
                              <FormGroup>
                                <Input
                                  placeholder="integral"
                                  type="text"
                                  name="itemName"
                                  value={element.itemName || ''}
                                  onChange={(e) =>
                                    setSubSectionValues(index, e)
                                  }
                                />
                              </FormGroup>
                            </Col>

                            <Col md="4">
                              <Button
                                className="ni ni-fa-trash-can"
                                onClick={() => removeSubSectionFields(index)}
                              >
                                Delete
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </CardBody>
                  </div>
                ))}
              </Card>
            </Form>
            <Button
              className="button add primary"
              color="success"
              type="button"
              onClick={() => addSectionFields()}
            >
              Add New Group
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SectionModal;
