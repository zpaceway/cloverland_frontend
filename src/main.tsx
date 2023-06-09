import React, { useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import CustomerPage from "./pages/customer";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useSearchParams,
} from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import AuthPage from "./pages/auth";
import NotFoundPage from "./pages/not-found/NotFound";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { ToastContainer } from "react-toastify";
import axios from "./lib/axios";
import { useCustomer } from "./hooks";
import HomePage from "./pages/home";
import LotteryPage from "./pages/lottery";
import TicketPage from "./pages/ticket";
import Debouncer from "./utils/Debouncer";
import PageWrapper from "./components/shared/PageWrapper";

const App = () => {
  const { customer, setCustomer, credentials, setCredentials } = useCustomer();
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncerRef = useRef(new Debouncer());

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

    debouncerRef.current.exec(() => {
      axios
        .get(`/api/customer/${customerId}/${customerSecret}/`)
        .then(({ data }) => {
          setCredentials({
            customerId,
            customerSecret,
          });
          if (!data.picture) {
            data.picture = `user-${(Math.random() * 10 + 1).toFixed(0)}.svg`;
          }
          setCustomer(data);
        })
        .catch(() => setCustomer(null));
    });
  }, [
    customer,
    searchParams,
    setCustomer,
    credentials.customerId,
    credentials.customerSecret,
    setCredentials,
  ]);

  useEffect(() => {
    getCustomer();
  }, [setCustomer, getCustomer]);

  useEffect(() => {
    const customerId = searchParams.get("customerId");
    const customerSecret = searchParams.get("customerSecret");

    if ((!customerId && !customerSecret) || customer === undefined) return;

    searchParams.delete("customerId");
    searchParams.delete("customerSecret");
    setSearchParams(new URLSearchParams(searchParams));
  }, [customer, searchParams, setSearchParams]);

  if (customer === undefined) {
    return <LoadingScreen />;
  }

  return (
    <PageWrapper>
      <Outlet />
    </PageWrapper>
  );
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
        ],
      },
      {
        path: "/ticket/:ticketId",
        element: <TicketPage />,
      },
      {
        path: "/customer",
        element: <CustomerPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);
