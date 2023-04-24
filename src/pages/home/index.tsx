import { useEffect, useRef } from "react";
import axios from "../../lib/axios";
import LoadingScreen from "../../components/LoadingScreen";
import { format } from "date-fns";
import Link from "../../components/shared/Link";
import { useAtom } from "jotai";
import { lotteriesAtom, pageWrapperDataAtom } from "../../atoms";
import Debouncer from "../../utils/Debouncer";

const HomePage = () => {
  const [lotteries, setLotteries] = useAtom(lotteriesAtom);
  const [, setPageWrapperData] = useAtom(pageWrapperDataAtom);
  const debouncerRef = useRef(new Debouncer());

  useEffect(() => {
    debouncerRef.current.exec(() => {
      axios
        .get("/api/lottery/")
        .then(({ data: { results: lotteries } }) => setLotteries(lotteries));
    });
  }, [setLotteries]);

  useEffect(() => {
    setPageWrapperData({
      header: "Home",
      title: "Welcome to cloverland",
    });
  }, [setPageWrapperData]);

  if (lotteries === undefined) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 text-sm text-gray-600">
        Cloverland is a blockchain lottery app that offers a secure and
        transparent platform for users to participate in lotteries. Transactions
        are recorded on the blockchain network, ensuring a fair process.
        Cloverland donates 10% of revenue to verified non-profits and keeps 5%
        for maintenance.
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
                    <td className="whitespace-nowrap px-6 py-4">
                      {lottery.price} {lottery.symbol}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <a
                        href={lottery.walletAddressLink}
                        rel="noreferrer"
                        className="text-blue-500 underline"
                        target="_blank"
                      >
                        {lottery.address.substring(0, 8)}...
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {format(new Date(lottery.createdAt), "yyyy-MM-dd")}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {format(new Date(lottery.endsAt), "yyyy-MM-dd")}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
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
    </div>
  );
};

export default HomePage;
