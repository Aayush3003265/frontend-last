import { HOME_ROUTE, ORDERS_ROUTE, PRODUCTS_ROUTE } from "./routes";

const navLinks = [
  {
    route: HOME_ROUTE,
    label: "Home",
    isAuth: false,
  },
  {
    route: PRODUCTS_ROUTE,
    label: "Products",
    isAuth: false,
  },
  {
    route: ORDERS_ROUTE,
    label: "Orders",
    isAuth: true,
  },
  // {
  //   route: "/news",
  //   label: "News",
  //   isAuth: true,
  //   subMenu: [
  //     {
  //       route: "/politics",
  //       label: "Politics",
  //     },
  //     {
  //       route: "/sports",
  //       label: "Sports",
  //     },
  //     {
  //       route: "/education",
  //       label: "Education",
  //     },
  //   ],
  // },
  {
    route: "/contact",
    label: "Contact",
    isAuth: false,
  },
];

export default navLinks;
