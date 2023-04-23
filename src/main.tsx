import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Lottery from "./pages/lottery";
import PayLottery from "./pages/lottery/pay";
import Order from "./pages/order";
import Customer from "./pages/customer";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router-dom";
import { customerAtom } from "./atoms";
import { useAtom } from "jotai";
import LoadingScreen from "./components/LoadingScreen";
import Auth from "./pages/auth";
import NotFound from "./components/NotFound";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { ToastContainer } from "react-toastify";
import axios from "./lib/axios";

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

type CustomerParams = {
  customerId: string;
  customerSecret: string;
};

const App = () => {
  const [customer, setCustomer] = useAtom(customerAtom);

  const { customerId, customerSecret } = useParams<CustomerParams>();

  const getCustomer = useCallback(() => {
    axios
      .get(`${backendBaseUrl}/api/customer`, {
        params: {
          id: customerId,
          secret: customerSecret,
        },
      })
      .then(({ data }) => {
        setCustomer(data);
      })
      .catch(() => setCustomer(null));
  }, [customerId, customerSecret, setCustomer]);

  useEffect(() => {
    setCustomer(undefined);
    getCustomer();
  }, [setCustomer, getCustomer]);

  if (customer === undefined) {
    return <LoadingScreen />;
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/lottery/:lotteryId",
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
        path: "/order/:orderId",
        element: <Order />,
      },
      {
        path: "/customer/:customerSecret/:customerId",
        element: <Customer />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);
