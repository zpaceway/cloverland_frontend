import Radio from "../../components/shared/Radio";
import Select from "../../components/shared/Select";
import TextField from "../../components/shared/TextField";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrBitcoin } from "react-icons/gr";
import { FaEthereum } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import Button from "../../components/shared/Button";
import LoadingScreen from "../../components/LoadingScreen";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../../components/NotFound";
import Lottery from "../../types/Lottery";
import { format } from "date-fns";

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

type LotteryAppParams = {
  id: string;
};

const LotteryApp = () => {
  const { id } = useParams<LotteryAppParams>();
  const navigate = useNavigate();
  const [lottery, setLottery] = useState<Lottery | undefined | null>(undefined);

  const getLottery = useCallback(() => {
    axios
      .get(`${backendBaseUrl}/api/lottery`, {
        params: {
          lotteryId: id,
        },
        withCredentials: true,
      })
      .then(({ data }) => {
        setLottery(data);
      })
      .catch(() => setLottery(null));
  }, [id, setLottery]);

  useEffect(() => {
    setLottery(undefined);
    getLottery();
  }, [setLottery, getLottery]);

  if (lottery === undefined) {
    return <LoadingScreen />;
  }

  if (id === undefined || lottery === null) {
    return <NotFound />;
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center bg-gray-100">
      <div className="flex w-full justify-center bg-white p-4">
        <div className="flex w-full max-w-4xl items-center gap-4">
          <img src="/logo.png" className="h-12 w-12 rounded-full" alt="" />
          <div className="flex flex-col text-sm">
            <div className="font-medium">Cloverland</div>
            <div className="text-gray-600">{lottery.name}</div>
          </div>
        </div>
      </div>
      <div className="grid h-full w-full place-items-center overflow-y-auto p-4">
        <div className="flex w-full max-w-4xl flex-col gap-4">
          <div className="flex flex-wrap text-6xl font-black">
            <div className="bg-black p-2 text-white">{lottery.name}</div>
            <div className="p-2"> Lottery</div>
          </div>
          <div className="flex flex-wrap gap-8">
            <div
              dangerouslySetInnerHTML={{
                __html: lottery.description,
              }}
              className="w-full max-w-full border border-gray-300 bg-white p-4 sm:max-w-md"
            ></div>
            <div className="flex w-full flex-col sm:w-auto">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <div className="flex gap-1">
                    <span className="text font-black">Name:</span>
                    {lottery.name}
                  </div>
                  <div className="flex gap-1">
                    <span className="text font-black">Price:</span>
                    {lottery.price} {lottery.symbol}
                  </div>
                  <div className="flex gap-1">
                    <span className="text font-black">Created at date:</span>
                    {format(new Date(lottery.createdAt), "yyyy-MM-dd")}
                  </div>
                  <div className="flex gap-1">
                    <span className="text font-black">Created at time:</span>
                    {format(new Date(lottery.createdAt), "p")}
                  </div>
                  <div className="flex gap-1">
                    <span className="text font-black">Ends at date:</span>
                    {format(new Date(lottery.endsAt), "yyyy-MM-dd")}
                  </div>
                  <div className="flex gap-1">
                    <span className="text font-black">Ends at time:</span>
                    {format(new Date(lottery.endsAt), "p")}
                  </div>
                </div>
                <Button onClick={() => navigate(`/lottery/${id}/pay`)}>
                  Buy ticket
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotteryApp;