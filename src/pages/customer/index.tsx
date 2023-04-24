import AuthPage from "../auth";
import { useCustomer } from "../../hooks";
import { format } from "date-fns";
import Button from "../../components/shared/Button";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { pageWrapperDataAtom } from "../../atoms";
import { useEffect } from "react";

const CustomerPage = () => {
  const { customer, signOut } = useCustomer();
  const navigate = useNavigate();
  const [, setPageWrapperData] = useAtom(pageWrapperDataAtom);

  useEffect(() => {
    setPageWrapperData({
      title: "Profile",
      header: `Welcome${customer?.fullName ? `, ${customer.fullName}` : ""}`,
    });
  }, [customer]);

  if (!customer) {
    return <AuthPage />;
  }

  return (
    <div className="flex w-full flex-col">
      <div className="relative h-56 w-full bg-gradient-to-r from-emerald-300 to-emerald-400">
        <div className="absolute left-4 top-[calc(100%_-_4rem)] h-32 w-32 rounded-full bg-white">
          <img
            src="/user-circle.svg"
            className="h-full w-full rounded-full shadow-md"
            alt=""
          />
        </div>
      </div>
      <div className="mt-20 flex w-full flex-col gap-8">
        <div className="flex flex-col">
          <div className="w-full text-center text-2xl font-black">
            {customer.fullName}
          </div>
          <div className="text-center text-gray-600">{customer.email}</div>
        </div>
        <div className="text-center text-gray-600">
          <Button color="error" onClick={signOut}>
            Sign out
          </Button>
        </div>

        <div className="w-full">
          <div className="w-full overflow-x-auto">
            <table className="table w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">
                    Ticket
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">
                    Lottery
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">
                    Payment
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">
                    Created At
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {customer.orders.map((order) => (
                  <tr key={order.id} className="border-b bg-white">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                    >
                      {order.id}
                    </th>
                    <td scope="row" className="whitespace-nowrap px-6 py-4">
                      <a
                        href={`/lottery/${order.lottery.id}`}
                        className="text-blue-500 underline"
                      >
                        {order.lottery.name}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={order.walletAddressLink}
                        className="text-blue-500 underline"
                        target="_blank"
                      >
                        {order.address.substring(0, 8)}...
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      {format(new Date(order.createdAt), "yyyy-MM-dd")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex whitespace-nowrap">
                        <Button
                          disabled={order.paid}
                          onClick={() => navigate(`/order/${order.id}`)}
                        >
                          {order.paid ? "Paid" : "Pay"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
