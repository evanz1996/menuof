import React, { useState, useEffect } from 'react';
// react library for routing
import { useLocation, NavLink as NavLinkRRD, Link } from 'react-router-dom';
// nodejs library that concatenates classes
import classnames from 'classnames';
// nodejs library to set properties for components
import { elementType, PropTypes } from 'prop-types';
// react library that creates nice scrollbar on windows devices
import PerfectScrollbar from 'react-perfect-scrollbar';
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Input,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { selectRestaurantId } from 'actions/selectRestaurant';
import { useDispatch, useSelector } from 'react-redux';
import currentRestaurantReducer from 'reducers/currentRestaurantReducer';
function Sidebar({ toggleSidenav, sidenavOpen, routes, logo, rtlActive }) {
  const [state, setState] = React.useState({});
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [restaurant, setRestaurant] = React.useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  const id = useSelector((state) => state.currentRestaurantReducer);
  console.log('IIIID', id);
  const restaurantTest = [
    {
      label: 'Apple',
      value: 1,
    },
    {
      label: 'Mango',
      value: 2,
    },
  ];
  useEffect(() => {
    if (localStorage.getItem('id')) {
      console.log('im here at SIDEBAR');
      let token = localStorage.getItem('token');
      setLoggedIn(true);
      var myHeaders = new Headers();

      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);

      var raw = '';
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

      fetch('http://menuof.test/api/resturant-owner/resturants', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log('SIDEBAR', result);
          // console.log('Lists of Sidebar', JSON.parse(result.data));
          setRestaurant(result);
        })
        .catch((error) => console.log('error', error));
    } else {
      history.push('/auth/login');
    }
  }, []);

  // useEffect(() => {
  //   if (loggedIn) {
  //     history.push('/admin/dashboard');

  //     var myHeaders = new Headers();
  //     myHeaders.append('mode', 'no-cors');
  //     myHeaders.append('Accept', 'application/json');
  //     myHeaders.append(
  //       'Authorization',
  //       'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NWNlZjU0Yy0wMjJlLTQyMzAtOTYxMi05MTM5Y2UxM2IwOTkiLCJqdGkiOiJhOTc2MDQxM2VlZmMwYTc3ZTcyOTI4MjA4ZjdlMTgyMzk0NTE5ZjJjMzVhN2YyZTU2NDY1ODE3MGY5YzFhMDU3ODYxMmE2ZDUyYWRkNjk3OSIsImlhdCI6MTY0Nzg1ODQyMC4xMDg3NDcsIm5iZiI6MTY0Nzg1ODQyMC4xMDg3NTEsImV4cCI6MTY3OTM5NDQyMC4wOTAxNDIsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.DrirXxI0xqNs7AnvVqzYCQY_gHh9mO3EL0PXZ7H-EFs2SOeGux00N6RvUHLoSFTgScAfIyVI9uCDnId6FGVepfSXur17Xbsz2EvC8OjQBlJVPMhCzImeWCKaqwiEP5U5UHLdJIm0x5Vpt7RiA-97i1RIvfbb-57jgfurxBIxwNfjWWN4gSx3UuVn_2hjfz-MHfRWmIh5dtE99qc8sozjnEts_xDkx3uWMn6sAqBJRcwwtcoSQmZNo7gvhB7Z8n3ZYvMxu61gnIKdLVebEZwhtMyotNL_p7zs6njbBkPkXyqCFUwtxRyaDaQESYqPIig9h2jRtGwskzNmHL3O58slbAzIR7kqWYg0e-aINnPDi5hwfOqvJaD2RqoKwFxG29XVB_SU95KRxVqyfv6QUBb5XrOHdAxqcesjZQOzx4J78ZCzEatlmIdXqQ8BST1mY7p17lBRzNLwS58ArQremVZL1ZG4jrGEymiNcI-RAxz9d68lOMxnB357mO-mCepmgXJMRo_BLrSh1QUoSWtnvYbkEPoD5FGcteKHO0G5_nH1CEKm6ccPFPU_9gal8p8pFSS7va3Ja12X1QT93u44EYR-Cv3N_VdKY1ZCw9w66XLvQsYDMXZpPTviy2ANEpZHeU_WmuB7s3ib0eHXwjUALO14h8XRvi2mzS9rU4fuD0P_9qM'
  //     );

  //     var raw = '';
  //     var requestOptions = {
  //       method: 'GET',
  //       headers: myHeaders,
  //       // body: raw,
  //       // redirect: 'follow',
  //     };

  //     fetch('http://menuof.test/api/resturant-owner/resturants', requestOptions)
  //       .then((response) => response.json())
  //       .then((result) => {
  //         console.log('Lists of Sidebar', result);
  //         // console.log('Lists of Sidebar', JSON.parse(result.data));
  //         setRestaurant(result.data);
  //       })
  //       .catch((error) => console.log('error', error));
  //     // return () => {
  //     //   second;
  //     // };
  //   } else {
  //     history.push('/auth/login');
  //   }
  // }, [loggedIn]);

  const location = useLocation();
  React.useEffect(() => {
    setState(getCollapseStates(routes));
    // eslint-disable-next-line
  }, []);
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  };
  // makes the sidenav normal on hover (actually when mouse enters on it)
  const onMouseEnterSidenav = () => {
    if (!document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.add('g-sidenav-show');
    }
  };
  // makes the sidenav mini on hover (actually when mouse leaves from it)
  const onMouseLeaveSidenav = () => {
    if (!document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-show');
    }
  };
  // this creates the intial state of this component based on the collapse routes
  // that it gets through routes
  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.js - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (location.pathname.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };
  // this is used on mobile devices, when a user navigates
  // the sidebar will autoclose
  const closeSidenav = () => {
    if (window.innerWidth < 1200) {
      toggleSidenav();
    }
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop['state']] = !state[prop.state];
        return (
          <NavItem key={key}>
            <NavLink
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={state[prop.state]}
              className={classnames({
                active: getCollapseInitialState(prop.views),
              })}
              onClick={(e) => {
                e.preventDefault();
                setState(st);
              }}
            >
              {prop.icon ? (
                <>
                  <i className={prop.icon} />
                  <span className="nav-link-text">{prop.name}</span>
                </>
              ) : prop.miniName ? (
                <>
                  <span className="sidenav-mini-icon"> {prop.miniName} </span>
                  <span className="sidenav-normal"> {prop.name} </span>
                </>
              ) : null}
            </NavLink>
            <Collapse isOpen={state[prop.state]}>
              <Nav className="nav-sm flex-column">
                {createLinks(prop.views)}
              </Nav>
            </Collapse>
          </NavItem>
        );
      }
      return (
        <NavItem className={activeRoute(prop.layout + prop.path)} key={key}>
          <NavLink
            to={prop.layout + prop.path}
            activeClassName=""
            onClick={closeSidenav}
            tag={NavLinkRRD}
          >
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <span className="nav-link-text">{prop.name}</span>
              </>
            ) : prop.miniName !== undefined ? (
              <>
                <span className="sidenav-mini-icon"> {prop.miniName} </span>
                <span className="sidenav-normal"> {prop.name} </span>
              </>
            ) : (
              prop.name
            )}
          </NavLink>
        </NavItem>
      );
    });
  };

  // let defaultRestaurant = restaurant[0];
  // console.log('defaultRestaurant', defaultRestaurant);
  const restaurantIdHandler = (e) => {
    e.preventDefault();
    let id = e.target.value;

    // if (!id) {
    //   dispatch(selectRestaurantId(id));
    // }
    setSelectedRestaurant(e.target.value);
    dispatch(selectRestaurantId(id));
  };

  console.log('here ate selected rest', selectedRestaurant);
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: '_blank',
    };
  }
  // let defaultRestaurantHere = '';
  const scrollBarInner = (
    <div className="scrollbar-inner">
      <div className="sidenav-header d-flex align-items-center">
        {restaurant ? (
          // <NavbarBrand {...navbarBrandProps}>
          //   <img
          //     alt={logo.imgAlt}
          //     className="navbar-brand-img"
          //     src={logo.imgSrc}
          //   />
          // </NavbarBrand>

          <Input
            type="select"
            name="select"
            id="exampleSelect"
            onChange={(e) => restaurantIdHandler(e)}
            // value={selectedValue}
          >
            {/* {restaurant} */}
            {/* {restaurant}?return(
            {restaurant.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
            ) */}
            {restaurant.map((option) => (
              <option
                key={option.id}
                value={option.id}
                // defaultValue={index === 0}
              >
                {option.name}
              </option>
            ))}
          </Input>
        ) : null}

        <div className="ml-auto">
          <div
            className={classnames('sidenav-toggler d-none d-xl-block', {
              active: sidenavOpen,
            })}
            onClick={toggleSidenav}
          >
            <div className="sidenav-toggler-inner">
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-inner">
        <Collapse navbar isOpen={true}>
          <Nav navbar>{createLinks(routes)}</Nav>
          <hr className="my-3" />
          <h6 className="navbar-heading p-0 text-muted">
            <span className="docs-normal">Documentation</span>
            <span className="docs-mini">D</span>
          </h6>
          <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink
                href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/overview?ref=adpr-sidebar"
                target="_blank"
              >
                <i className="ni ni-spaceship" />
                <span className="nav-link-text">Getting started</span>
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/colors?ref=adpr-sidebar"
                target="_blank"
              >
                <i className="ni ni-palette" />
                <span className="nav-link-text">Foundation</span>
              </NavLink>
            </NavItem> */}
            {/* <NavItem>
              <NavLink
                href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/alert?ref=adpr-sidebar"
                target="_blank"
              >
                <i className="ni ni-ui-04" />
                <span className="nav-link-text">Components</span>
              </NavLink>
            </NavItem> */}
            {/* <NavItem>
              <NavLink
                href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/charts?ref=adpr-sidebar"
                target="_blank"
              >
                <i className="ni ni-chart-pie-35" />
                <span className="nav-link-text">Plugins</span>
              </NavLink>
            </NavItem> */}
          </Nav>
        </Collapse>
      </div>
    </div>
  );
  return (
    <>
      <Navbar
        className={
          'sidenav navbar-vertical navbar-expand-xs navbar-light bg-white ' +
          (rtlActive ? '' : 'fixed-left')
        }
        onMouseEnter={onMouseEnterSidenav}
        onMouseLeave={onMouseLeaveSidenav}
      >
        {navigator.platform.indexOf('Win') > -1 ? (
          <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar>
        ) : (
          scrollBarInner
        )}
      </Navbar>
    </>
  );
}

Sidebar.defaultProps = {
  routes: [{}],
  toggleSidenav: () => {},
  sidenavOpen: false,
  rtlActive: false,
};

Sidebar.propTypes = {
  // function used to make sidenav mini or normal
  toggleSidenav: PropTypes.func,
  // prop to know if the sidenav is mini or normal
  sidenavOpen: PropTypes.bool,
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  // logo
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
  // rtl active, this will make the sidebar to stay on the right side
  rtlActive: PropTypes.bool,
};

export default Sidebar;
