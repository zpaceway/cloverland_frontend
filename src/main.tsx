import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom/client";
import PayLottery from "./pages/lottery/pay";
import CustomerPage from "./pages/customer";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useSearchParams,
} from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import AuthPage from "./pages/auth";
import NotFound from "./components/NotFound";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { ToastContainer } from "react-toastify";
import axios from "./lib/axios";
import { useCustomer } from "./hooks";
import HomePage from "./pages/home";
import LotteryPage from "./pages/lottery";
import OrderPage from "./pages/order";

const App = () => {
  const { customer, setCustomer, credentials, setCredentials } = useCustomer();
  const [searchParams, setSearchParams] = useSearchParams();

  const getCustomer = useCallback(() => {
    const customerId = searchParams.get("customerId") || credentials.customerId;
    const customerSecret =
      searchParams.get("customerSecret") || credentials.customerSecret;

    if (!customerId || !customerSecret) {
      return customer === undefined && setCustomer(null);
    }

    if (customer && customer.id === customerId) {
      return;
    }

    axios
      .get("/api/customer", {
        params: {
          id: customerId,
          secret: customerSecret,
        },
      })
      .then(({ data }) => {
        setCredentials({
          customerId,
          customerSecret,
        });
        searchParams.delete("customerId");
        searchParams.delete("customerSecret");
        setSearchParams(new URLSearchParams(searchParams));
        setCustomer(data);
      })
      .catch(() => setCustomer(null));
  }, [customer, searchParams, setCustomer]);

  useEffect(() => {
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
        path: "",
        element: <HomePage />,
      },
      {
        path: "/lottery/:lotteryId",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <LotteryPage />,
          },
          {
            path: "pay",
            element: <PayLottery />,
          },
        ],
      },
      {
        path: "/order/:orderId",
        element: <OrderPage />,
      },
      {
        path: "/customer",
        element: <CustomerPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
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
