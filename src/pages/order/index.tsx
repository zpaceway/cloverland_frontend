import { useCallback, useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../../components/NotFound";
import Order from "../../types/Order";
import Button from "../../components/shared/Button";
import TopBar from "../../components/TopBar";
import axios from "../../lib/axios";

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

type OrderAppParams = {
  orderId: string;
};

const OrderApp = () => {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const { orderId } = useParams<OrderAppParams>();
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(false);

  const getOrder = useCallback(() => {
    axios
      .get(`${backendBaseUrl}/api/order`, {
        params: {
          orderId,
        },
      })
      .then(({ data }) => {
        setOrder(data);
      })
      .catch(() => setOrder(null));
  }, [setOrder]);

  useEffect(() => {
    setOrder(undefined);
    getOrder();
  }, [setOrder, getOrder]);

  if (order === undefined) {
    return <LoadingScreen />;
  }

  if (order === null || orderId === undefined) {
    return <NotFound />;
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center bg-gray-100">
      <TopBar subtitle={`Order #${order.id}`} />
      <div className="grid h-full w-full place-items-center overflow-y-auto p-4">
        <div className="z-50 flex w-full max-w-xl flex-col gap-4 border border-gray-300 bg-white p-4">
          <div className="font-medium text-gray-900">Order #{order.id}</div>
          <div className="flex flex-col gap-4 text-sm text-gray-600">
            <div>
              <div className="flex flex-col gap-4 text-sm text-gray-600">
                {!order.paid ? (
                  <div className="flex flex-col gap-4">
                    <div>
                      Thank you for your interest in participating in "
                      {order.lottery.name}" lottery. To pay for your ticket you
                      have to transfer{" "}
                      <b>
                        {order.lottery.price} {order.lottery.symbol}
                      </b>{" "}
                      to the following address{" "}
                      <b className="break-all">{order.address}</b>.
                    </div>
                    <div>
                      Once the transaction is completed, please click on the
                      validate button down bellow or refresh this page.
                    </div>
                  </div>
                ) : (
                  <div>
                    You have successfully completed this order. Your ticket id
                    is the same as your order id, we wish you the best and
                    really hope you are the winner of the prize! There's nothing
                    else to do here, if you want another ticket you can click{" "}
                    <a
                      href=""
                      className="text-blue-500"
                      onClick={() =>
                        navigate(`/lottery/${order.lottery.id}/pay`)
                      }
                    >
                      here
                    </a>
                    .
                  </div>
                )}
                <Button
                  onClick={() => {
                    setIsValidating(true);
                    axios
                      .get(`${backendBaseUrl}/api/order`, {
                        params: {
                          orderId: order.id,
                        },
                      })
                      .then(({ data }) => {
                        setOrder(data);
                      })
                      .catch(() => {})
                      .finally(() => setIsValidating(false));
                  }}
                  disabled={order.paid}
                  loading={isValidating}
                >
                  {order.paid ? "Paid" : "Validate"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderApp;
