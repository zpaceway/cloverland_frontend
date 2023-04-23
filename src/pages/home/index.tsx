import { useEffect, useState } from "react";
import PageWrapper from "../../components/shared/PageWrapper";
import Lottery from "../../types/Lottery";
import axios from "../../lib/axios";
import LoadingScreen from "../../components/LoadingScreen";
import { format } from "date-fns";
import Link from "../../components/shared/Link";

const HomePage = () => {
  const [lotteries, setLotteries] = useState<Lottery[] | undefined>(undefined);

  useEffect(() => {
    axios
      .get("/api/lottery/")
      .then(({ data: { results: lotteries } }) => setLotteries(lotteries));
  }, []);

  if (lotteries === undefined) {
    return <LoadingScreen />;
  }

  return (
    <PageWrapper header="Home" title="Welcome to cloverland!">
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="whitespace-nowrap px-6 py-3">
                Lottery
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-3">
                Price
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-3">
                Address
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-3">
                Created At
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-3">
                Ends At
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {lotteries.map((lottery) => (
              <tr key={lottery.id} className="border-b bg-white">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {lottery.name}
                </th>
                <td className="px-6 py-4">
                  {lottery.price} {lottery.symbol}
                </td>
                <td className="px-6 py-4">
                  <a
                    href={lottery.walletAddressLink}
                    className="text-blue-500 underline"
                    target="_blank"
                  >
                    {lottery.address.substring(0, 8)}...
                  </a>
                </td>
                <td className="px-6 py-4">
                  {format(new Date(lottery.createdAt), "yyyy-MM-dd")}
                </td>
                <td className="px-6 py-4">
                  {format(new Date(lottery.endsAt), "yyyy-MM-dd")}
                </td>
                <td className="px-6 py-4">
                  <div className="flex">
                    <Link to={`/lottery/${lottery.id}`}>Get a Ticket</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
