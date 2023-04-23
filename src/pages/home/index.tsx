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
      <div className="flex flex-col gap-4 text-sm text-gray-600">
        <div>
          Cloverland is a blockchain-based lottery app that provides a secure
          and transparent platform for users to participate in lotteries. When a
          user purchases a lottery ticket on Cloverland, their transaction is
          recorded on the blockchain network, creating an immutable record of
          the purchase.
        </div>
        <div>
          To determine the winner of the lottery, Cloverland reviews the
          transactions on the blockchain network and selects a winner based on a
          random selection process. Once the winner is determined, they receive
          the prize money directly to their blockchain wallet.
        </div>
        <div>
          Cloverland is also committed to supporting charitable causes by
          donating 10% of the lottery revenue to verified and selected
          non-profit organizations. These charities are chosen based on their
          impact and transparency, and Cloverland works directly with them to
          ensure that the donations are used effectively.
        </div>
        <div>
          In addition, the Cloverland team receives 5% of the lottery revenue to
          cover the maintenance costs of the platform, including ongoing
          development and maintenance expenses.
        </div>
        <div>
          By using the blockchain network to record and verify transactions and
          by sharing a portion of the revenue with charitable causes and the
          Cloverland team, Cloverland provides a transparent, secure, and
          sustainable lottery platform. Users can trust that the lottery process
          is fair and impartial, and they can participate in the lottery with
          the knowledge that a portion of the proceeds will go to a good cause
          and to support the continued development of the platform.
        </div>
        <br />
      </div>

      <div className="w-full">
        <div className="w-full overflow-x-auto">
          <div className="table w-full overflow-x-auto">
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
                      <div className="flex whitespace-nowrap">
                        <Link to={`/lottery/${lottery.id}`}>Get a Ticket</Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
