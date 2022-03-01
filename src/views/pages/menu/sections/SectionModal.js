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
  // const [sectionValues1, setSectionValues1] = useState([{ section: '' }]);
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
    console.log('subindex', i);
    let newFormValues = [...sectionValues];
    newFormValues[i][e.target.name] = e.target.value;
    console.log('section', newFormValues[i][e.target.name]);
    setSectionValues(newFormValues);
  };
  let handleSubSectionChange = (i, e) => {
    console.log(i, e);
    console.log('index', i);
    let newFormValues = [...subSectionValues];
    newFormValues[i][e.target.name] = e.target.value;
    console.log('newFormValues subsection', newFormValues[i][e.target.name]);
    console.log(newFormValues);
    // console.log(newFormValues[0]);

    setSubSectionValues(newFormValues);
  };
  console.log('outsideSUb', sectionValues);
  console.log('outside', subSectionValues);

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
                      {index}

                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label className="form-control-label">
                              Menu Section
                            </label>
                            {/* <Input required type="text" placeholder="eg: Dough" /> */}
                            <Input
                              type="text"
                              name="section"
                              value={input.section || ''}
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
                            {index}
                            {/* {element} */}
                            <Col md="8">
                              <FormGroup>
                                <Input
                                  placeholder="integral"
                                  type="text"
                                  name="subsection"
                                  value={element.subsection || ''}
                                  onChange={(e) =>
                                    handleSubSectionChange(index, e)
                                  }

                                  // onChange={(e) =>
                                  //   setSubSectionValues(index, e)
                                  // }
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
