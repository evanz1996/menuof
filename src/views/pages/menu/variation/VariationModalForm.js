import React, { useState } from 'react';
import classnames from 'classnames';
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
  CardTitle,
  NavItem,
  NavLink,
  Nav,
  TabPane,
  TabContent,
  Table,
} from 'reactstrap';
import OptionTable from '../../tables/OptionTable';
import FoodGroupTable from 'views/pages/tables/FoodGroupTable';
function VariationModalForm() {
  const [formValues, setFormValues] = useState([{ name: '', email: '' }]);
  const [selected, setSelected] = useState('selected1');
  const [tabs, setTabs] = useState(1);
  console.log(tabs);
  const [formGroupValues, setformGroupValues] = useState([
    { groupName: '', groupOptions: '', maxChoices: 0 },
  ]);

  let addFormFields = () => {
    setFormValues([...formValues, { itemName: '', itemPrice: 0 }]);
  };
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let removeFormFields = (i) => {
    console.log('index', i);
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  //group
  let addGroupFields = () => {
    console.log('i am here bro');
    setformGroupValues([
      ...formGroupValues,
      { groupName: '', groupOptions: '', maxChoices: 0 },
    ]);
    console.log(formGroupValues);
  };
  let handleGroupChange = (i, e) => {
    let newFormValues = [...formGroupValues];
    newFormValues[i][e.target.name] = e.target.value;
    setformGroupValues(newFormValues);
  };
  let removeGroupFormFields = (i) => {
    console.log('index', i);
    let newFormValues = [...formGroupValues];
    newFormValues.splice(i, 1);
    setformGroupValues(newFormValues);
  };

  const toggleNavs = (e, tabs, index) => {
    e.preventDefault();
    setTabs(index);
  };

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle> Options/Variations</CardTitle>
          <Nav
            className="nav-fill flex-column flex-md-row"
            id="tabs-icons-text"
            pills
            role="tablist"
          >
            <NavItem>
              <NavLink
                aria-selected={tabs === 1}
                className={classnames('mb-sm-3 mb-md-0', {
                  active: tabs === 1,
                })}
                onClick={(e) => toggleNavs(e, 'tabs', 1)}
                href="#pablo"
                role="tab"
              >
                <i className="ni ni-cloud-upload-96 mr-2" />
                Options
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={tabs === 2}
                className={classnames('mb-sm-3 mb-md-0', {
                  active: tabs === 2,
                })}
                onClick={(e) => toggleNavs(e, 'tabs', 2)}
                href="#pablo"
                role="tab"
              >
                <i className="ni ni-bell-55 mr-2" />
                Groups
              </NavLink>
            </NavItem>
          </Nav>
        </CardBody>
      </Card>
      <Container>
        <Card className="shadow">
          <CardBody>
            <TabContent activeTab={'tabs' + tabs}>
              <TabPane tabId="tabs1">
                <h3>Restaurant Settings</h3>
                <OptionTable></OptionTable>
              </TabPane>
              <TabPane tabId="tabs2">
                <h3>Orders Settings</h3>
                <FoodGroupTable></FoodGroupTable>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default VariationModalForm;
