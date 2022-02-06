import React, { useState } from 'react';
import classnames from 'classnames';
// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
} from 'reactstrap';
import RestaurantSettingsForm from '../forms/RestaurantSettingsForm';
function Settings() {
  const [tabs, setTabs] = useState(1);
  console.log(tabs);
  const toggleNavs = (e, tabs, index) => {
    e.preventDefault();
    setTabs(index);
  };
  return (
    <>
      <Container>
        <div>
          <div className="nav-wrapper">
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
                  Restaurant
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
                  Orders
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={tabs === 3}
                  className={classnames('mb-sm-3 mb-md-0', {
                    active: tabs === 3,
                  })}
                  onClick={(e) => toggleNavs(e, 'tabs', 3)}
                  href="#pablo"
                  role="tab"
                >
                  <i className="ni ni-calendar-grid-58 mr-2" />
                  Payments
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </div>
      </Container>
      <Container>
        <Card className="shadow">
          <CardBody>
            <TabContent activeTab={'tabs' + tabs}>
              <TabPane tabId="tabs1">
                <h3>Restaurant Settings</h3>

                <p className="description">
                  N.B.: Per disattivare temporaneamente gli ordini creare un
                  avviso attivando l'opzione "Disattivare gli ordini[...]"
                </p>
                <RestaurantSettingsForm></RestaurantSettingsForm>
              </TabPane>
              <TabPane tabId="tabs2">
                <h3>Orders Settings</h3>
                <p className="description">
                  I am tab 2 Cosby sweater eu banh mi, qui irure terry
                  richardson ex squid. Aliquip placeat salvia cillum iphone.
                  Seitan aliquip quis cardigan american apparel, butcher
                  voluptate nisi qui.
                </p>
              </TabPane>
              <TabPane tabId="tabs3">
                <h3>Payments</h3>
                <p className="description">
                  I am tab 3 Raw denim you probably haven't heard of them jean
                  shorts Austin. Nesciunt tofu stumptown aliqua, retro synth
                  master cleanse. Mustache cliche tempor, williamsburg carles
                  vegan helvetica. Reprehenderit butcher retro keffiyeh
                  dreamcatcher synth.
                </p>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default Settings;
