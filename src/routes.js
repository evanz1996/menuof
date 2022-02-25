import Buttons from 'views/pages/components/Buttons.js';
import Calendar from 'views/pages/Calendar.js';
import Cards from 'views/pages/components/Cards.js';
import Charts from 'views/pages/Charts.js';
import Components from 'views/pages/forms/Components.js';
import Elements from 'views/pages/forms/Elements.js';
import Google from 'views/pages/maps/Google.js';
import Grid from 'views/pages/components/Grid.js';
import Icons from 'views/pages/components/Icons.js';
import Lock from 'views/pages/examples/Lock.js';
import Login from 'views/pages/examples/Login.js';
import Notifications from 'views/pages/components/Notifications.js';
import Pricing from 'views/pages/examples/Pricing.js';
import Profile from 'views/pages/examples/Profile.js';
import ReactBSTables from 'views/pages/tables/ReactBSTables.js';
import Register from 'views/pages/examples/Register.js';
import RTLSupport from 'views/pages/examples/RTLSupport.js';
import Sortable from 'views/pages/tables/Sortable.js';
import Tables from 'views/pages/tables/Tables.js';
import Timeline from 'views/pages/examples/Timeline.js';
import Typography from 'views/pages/components/Typography.js';
import Validation from 'views/pages/forms/Validation.js';
import Vector from 'views/pages/maps/Vector.js';
import Widgets from 'views/pages/Widgets.js';
import Menu from 'views/pages/menu/Menu';
import Warehouse from 'views/pages/warehouse/Warehouse';

import Statistics from 'views/pages/statistics/Statistics';
import Settings from 'views/pages/settings/Settings';
import Subscription from 'views/pages/subscription/Subscription';
import Loyalty from 'views/pages/loyalty/Loyalty';
import Discounts from 'views/pages/discounts/Discounts';
import Blog from 'views/pages/blog/Blog';
import Notices from 'views/pages/notices/Notices';
import QrCode from 'views/pages/qrCode/QrCode';
import AutomaticPrinting from 'views/pages/automaticPrinting/AutomaticPrinting';
import videoGuidelines from 'views/pages/videoGuidelines/videoGuidelines';
import Order from 'views/pages/orders/Order';
import Reservation from 'views/pages/reservation/Reservation';
import Variation from 'views/pages/variations/Variation';
import RestaurantForm from 'views/pages/restaurant/RestaurantForm';
import Dashboard from 'views/pages/dashboards/Dashboard';
import RestaurantDashboard from 'views/pages/dashboards/RestaurantDashboard';
import RegisterRestaurant from 'views/pages/examples/RegisterRestaurant';
// import Register from 'views/pages/authentication/Register';
const routes = [
  // {
  //   collapse: true,
  //   name: 'Dashboards',
  //   icon: 'ni ni-shop text-primary',
  //   state: 'dashboardsCollapse',
  // },
  //   views: [
  //     {
  //       path: '/dashboard',
  //       name: 'Dashboard',
  //       miniName: 'D',
  //       component: Dashboard,
  //       layout: '/admin',
  //     },
  //     {
  //       path: '/alternative-dashboard',
  //       name: 'Alternative',
  //       miniName: 'A',
  //       component: Alternative,
  //       layout: '/admin',
  //     },
  //   ],
  // },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   icon: 'ni ni-box-2 text-red',
  //   component: RestaurantDashboard,
  //   layout: '/admin',
  // },
  {
    path: '/menu',
    name: 'Menu',
    icon: 'ni ni-box-2 text-red',
    component: Menu,
    layout: '/admin',
  },
  {
    path: '/warehouse',
    name: 'Warehouse',
    icon: 'ni ni-shop text-red',
    component: Warehouse,
    layout: '/admin',
  },

  {
    path: '/orders',
    name: 'Orders',
    icon: 'ni ni-cart text-red',
    component: Order,
    layout: '/admin',
  },
  {
    path: '/reservations',
    name: 'Reservations',
    icon: 'ni ni-paper-diploma text-red',
    component: Reservation,
    layout: '/admin',
  },
  {
    path: '/statistics',
    name: 'Statistics',
    icon: 'ni ni-sound-wave text-red',
    component: Statistics,
    layout: '/admin',
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: 'ni ni-settings text-red',
    component: Settings,
    layout: '/admin',
  },
  {
    path: '/subscription',
    name: 'Subscription',
    icon: 'ni ni-credit-card text-red',
    component: Subscription,
    layout: '/admin',
  },
  {
    path: '/loyalty-card',
    name: 'Loyalty Card',
    icon: 'ni ni-cart text-red',
    component: Loyalty,
    layout: '/admin',
  },
  {
    path: '/discounts',
    name: 'Discounts',
    icon: 'ni ni-cart text-red',
    component: Discounts,
    layout: '/admin',
  },
  {
    path: '/blog',
    name: 'Blog',
    icon: 'ni ni-cart text-red',
    component: Blog,
    layout: '/admin',
  },
  {
    path: '/notices',
    name: 'Notices',
    icon: 'ni ni-cart text-red',
    component: Notices,
    layout: '/admin',
  },
  {
    path: '/qr-code',
    name: 'QR code',
    icon: 'ni ni-cart text-red',
    component: QrCode,
    layout: '/admin',
  },
  {
    path: '/automatic-printing',
    name: 'Automatic Printing',
    icon: 'ni ni-cart text-red',
    component: AutomaticPrinting,
    layout: '/admin',
  },
  {
    path: '/video-guides',
    name: 'Video Guides',
    icon: 'ni ni-cart text-red',
    component: videoGuidelines,
    layout: '/admin',
  },
  {
    path: '/variations',
    name: 'Variation',
    icon: 'ni ni-box-2 text-red',
    component: Variation,
    layout: '/admin',
    show: false,
  },

  {
    collapse: true,
    name: 'Examples',
    icon: 'ni ni-ungroup text-orange',
    state: 'examplesCollapse',
    views: [
      {
        path: '/pricing',
        name: 'Pricing',
        miniName: 'P',
        component: Pricing,
        layout: '/auth',
      },
      {
        path: '/restaurant',
        name: 'Restaurant',
        miniName: 'P',
        component: RestaurantForm,
        layout: '/auth',
      },
      {
        path: '/login',
        name: 'Login',
        miniName: 'L',
        component: Login,
        layout: '/auth',
      },
      {
        path: '/register',
        name: 'Register',
        miniName: 'R',
        component: Register,
        layout: '/auth',
      },
      // {
      //   path: '/check',
      //   name: 'RestaurantForm',
      //   miniName: 'R',
      //   component: RestaurantForm,
      //   layout: '/auth',
      // },
      {
        path: '/lock',
        name: 'Lock',
        miniName: 'L',
        component: Lock,
        layout: '/auth',
      },
      {
        path: '/timeline',
        name: 'Timeline',
        miniName: 'T',
        component: Timeline,
        layout: '/admin',
      },
      {
        path: '/profile',
        name: 'Profile',
        miniName: 'P',
        component: Profile,
        layout: '/admin',
      },
      {
        path: '/rtl-support',
        name: 'RTL Support',
        miniName: 'RS',
        component: RTLSupport,
        layout: '/rtl',
      },
    ],
  },
  {
    collapse: true,
    name: 'Components',
    icon: 'ni ni-ui-04 text-info',
    state: 'componentsCollapse',
    views: [
      {
        path: '/buttons',
        name: 'Buttons',
        miniName: 'B',
        component: Buttons,
        layout: '/admin',
      },
      {
        path: '/cards',
        name: 'Cards',
        miniName: 'C',
        component: Cards,
        layout: '/admin',
      },
      {
        path: '/grid',
        name: 'Grid',
        miniName: 'G',
        component: Grid,
        layout: '/admin',
      },
      {
        path: '/notifications',
        name: 'Notifications',
        miniName: 'N',
        component: Notifications,
        layout: '/admin',
      },
      {
        path: '/icons',
        name: 'Icons',
        miniName: 'I',
        component: Icons,
        layout: '/admin',
      },
      {
        path: '/typography',
        name: 'Typography',
        miniName: 'T',
        component: Typography,
        layout: '/admin',
      },
      {
        collapse: true,
        name: 'Multi Level',
        miniName: 'M',
        state: 'multiCollapse',
        views: [
          {
            path: '#pablo',
            name: 'Third level menu',
            component: () => {},
            layout: '/',
          },
          {
            path: '#pablo',
            name: 'Just another link',
            component: () => {},
            layout: '/',
          },
          {
            path: '#pablo',
            name: 'One last link',
            component: () => {},
            layout: '/',
          },
        ],
      },
    ],
  },
  {
    collapse: true,
    name: 'Forms',
    icon: 'ni ni-single-copy-04 text-pink',
    state: 'formsCollapse',
    views: [
      {
        path: '/elements',
        name: 'Elements',
        miniName: 'E',
        component: Elements,
        layout: '/admin',
      },
      {
        path: '/components',
        name: 'Components',
        miniName: 'C',
        component: Components,
        layout: '/admin',
      },
      {
        path: '/validation',
        name: 'Validation',
        miniName: 'V',
        component: Validation,
        layout: '/admin',
      },
    ],
  },
  {
    collapse: true,
    name: 'Tables',
    icon: 'ni ni-align-left-2 text-default',
    state: 'tablesCollapse',
    views: [
      {
        path: '/tables',
        name: 'Tables',
        miniName: 'T',
        component: Tables,
        layout: '/admin',
      },
      {
        path: '/sortable',
        name: 'Sortable',
        miniName: 'S',
        component: Sortable,
        layout: '/admin',
      },
      {
        path: '/react-bs-table',
        name: 'React BS Tables',
        miniName: 'RBT',
        component: ReactBSTables,
        layout: '/admin',
      },
    ],
  },
  {
    collapse: true,
    name: 'Maps',
    icon: 'ni ni-map-big text-primary',
    state: 'mapsCollapse',
    views: [
      {
        path: '/google',
        name: 'Google',
        miniName: 'G',
        component: Google,
        layout: '/admin',
      },
      {
        path: '/vector',
        name: 'Vector',
        miniName: 'V',
        component: Vector,
        layout: '/admin',
      },
    ],
  },
  {
    path: '/widgets',
    name: 'Widgets',
    icon: 'ni ni-archive-2 text-green',
    component: Widgets,
    layout: '/admin',
  },
  {
    path: '/charts',
    name: 'Charts',
    icon: 'ni ni-chart-pie-35 text-info',
    component: Charts,
    layout: '/admin',
  },
  {
    path: '/calendar',
    name: 'Calendar',
    icon: 'ni ni-calendar-grid-58 text-red',
    component: Calendar,
    layout: '/admin',
  },
];

export default routes;
