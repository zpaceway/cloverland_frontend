import { useCallback, useEffect, useState } from "react";
import Button from "../../components/shared/Button";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "../not-found/NotFound";
import Lottery from "../../types/Lottery";
import { format } from "date-fns";
import axios from "../../lib/axios";
import PageWrapper from "../../components/shared/PageWrapper";

type LotteryPageParams = {
  lotteryId: string;
};

const LotteryPage = () => {
  const { lotteryId } = useParams<LotteryPageParams>();
  const navigate = useNavigate();
  const [lottery, setLottery] = useState<Lottery | undefined | null>(undefined);

  const getLottery = useCallback(() => {
    axios
      .get(`/api/lottery/${lotteryId}/`)
      .then(({ data }) => {
        setLottery(data);
      })
      .catch(() => setLottery(null));
  }, [lotteryId, setLottery]);

  useEffect(() => {
    setLottery(undefined);
    getLottery();
  }, [setLottery, getLottery]);

  if (lottery === undefined) {
    return <LoadingScreen />;
  }

  if (lotteryId === undefined || lottery === null) {
    return <NotFoundPage />;
  }

  return (
    <PageWrapper header={lottery.name} title="Take a look at this lottery!">
      <div className="mb-8 flex flex-col gap-4 text-sm text-gray-600">
        Cloverland offers a secure and transparent platform for lotteries, but
        we don't take responsibility for any losses. We promote responsible
        gambling and advise users to comply with applicable laws. Using
        Cloverland is at your own risk, and you agree to these terms.
      </div>
      <div className="mb-8 flex flex-wrap text-6xl font-black">
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
                <span className="font-black">Name:</span>
                {lottery.name}
              </div>
              <div className="flex gap-1">
                <span className="font-black">Price:</span>
                {lottery.price} {lottery.symbol}
              </div>
              <div className="flex gap-1">
                <span className="font-black">Created at:</span>
                {format(new Date(lottery.createdAt), "yyyy-MM-dd")}
              </div>
              <div className="flex gap-1">
                <span className="font-black">Ends at:</span>
                {format(new Date(lottery.endsAt), "yyyy-MM-dd")}
              </div>
            </div>
            <Button onClick={() => navigate(`/lottery/${lotteryId}/pay`)}>
              Buy ticket
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LotteryPage;
