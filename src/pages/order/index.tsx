import { useCallback, useEffect, useState } from "react";
import PaymentModal from "../../components/PaymentModal";
import LoadingScreen from "../../components/LoadingScreen";
import axios from "axios";
import { useParams } from "react-router-dom";
import NotFound from "../../components/NotFound";
import Order from "../../types/Order";

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

type OrderAppParams = {
  id: string;
};

const OrderApp = () => {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const { id } = useParams<OrderAppParams>();

  const getOrder = useCallback(() => {
    axios
      .get(`${backendBaseUrl}/api/order`, {
        params: {
          orderId: id,
        },
        withCredentials: true,
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

  if (order === null || id === undefined) {
    return <NotFound />;
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center bg-gray-100">
      <PaymentModal
        order={order}
        onValidate={async () =>
          axios
            .get(`${backendBaseUrl}/api/order`, {
              params: {
                orderId: order.id,
              },
              withCredentials: true,
            })
            .then(({ data }) => {
              setOrder(data);
            })
            .catch(() => {})
        }
      />
    </div>
  );
};

export default OrderApp;
