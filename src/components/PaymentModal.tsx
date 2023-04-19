import { useState } from "react";
import Order from "../types/Order";
import Button from "./shared/Button";
import { useNavigate } from "react-router-dom";

type PaymentModalProps = {
  order: Order;
  onValidate: () => Promise<void>;
};

const PaymentModal = ({ order, onValidate }: PaymentModalProps) => {
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(false);
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-3xl"></div>
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
                  You have successfully completed this order. Your ticket id is
                  the same as your order id, we wish you the best and really
                  hope you are the winner of the prize! There's nothing else to
                  do here, if you want another ticket you can click{" "}
                  <a
                    href=""
                    className="text-blue-500"
                    onClick={() => navigate(`/lottery/${order.lottery.id}/pay`)}
                  >
                    here
                  </a>
                  .
                </div>
              )}
              <Button
                onClick={() => {
                  setIsValidating(true);
                  onValidate().then(() => setIsValidating(false));
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
  );
};

export default PaymentModal;
