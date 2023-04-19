import React from "react";
import ReactDOM from "react-dom/client";
import Lottery from "./pages/lottery";
import PayLottery from "./pages/lottery/pay";
import Order from "./pages/order";
import Customer from "./pages/customer";
import "./index.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/lottery/:id",
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <Lottery />,
      },
      {
        path: "pay",
        element: <PayLottery />,
      },
    ],
  },
  {
    path: "/order/:id",
    element: <Order />,
  },
  {
    path: "/customer/:secret/:id",
    element: <Customer />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
