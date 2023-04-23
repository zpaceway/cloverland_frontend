import { useCallback, useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../../components/NotFound";
import Order from "../../types/Order";
import Button from "../../components/shared/Button";
import TopBar from "../../components/TopBar";
import axios from "../../lib/axios";
import { toast } from "react-toastify";
import PageWrapper from "../../components/shared/PageWrapper";

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

type OrderPageParams = {
  orderId: string;
};

const OrderPage = () => {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const { orderId } = useParams<OrderPageParams>();
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
    <PageWrapper header={`Order #${order.id}`} title="Your order is ready!">
      <div className="flex w-full max-w-xl flex-col gap-4 border border-gray-300 bg-white p-4">
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
                  You have successfully completed this order. Your ticket id is
                  the same as your order id, we wish you the best and really
                  hope you are the winner of the prize! There's nothing else to
                  do here, if you want another ticket you can click{" "}
                  <span
                    className="text-blue-500"
                    onClick={() => navigate(`/lottery/${order.lottery.id}/pay`)}
                  >
                    here
                  </span>
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
                      if (!data.paid) {
                        return toast.error(
                          "We were not able to validate your order yet. Please verify you transfer the right amount of coins to the address provided before clicking on validate."
                        );
                      }
                      return toast.success(
                        "Order validated successfully, you will receive an email with the confirmation."
                      );
                      setOrder(data);
                    })
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
    </PageWrapper>
  );
};

export default OrderPage;
