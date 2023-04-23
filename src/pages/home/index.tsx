import { useEffect, useState } from "react";
import PageWrapper from "../../components/shared/PageWrapper";
import Lottery from "../../types/Lottery";
import axios from "../../lib/axios";

const HomePage = () => {
  const [lotteries, setLotteries] = useState([] as Lottery[]);

  useEffect(() => {
    axios.get("/api/lottery");
  }, []);

  return (
    <PageWrapper header="Home" title="Welcome to cloverland!">
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$22999</td>
              <td className="px-6 py-4">$22999</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
