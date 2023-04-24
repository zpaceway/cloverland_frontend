import { useCallback, useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "../not-found/NotFound";
import Ticket from "../../types/Ticket";
import Button from "../../components/shared/Button";
import axios from "../../lib/axios";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { pageWrapperDataAtom } from "../../atoms";

type TicketPageParams = {
  ticketId: string;
};

const TicketPage = () => {
  const [ticket, setTicket] = useState<Ticket | null | undefined>(undefined);
  const { ticketId } = useParams<TicketPageParams>();
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(false);
  const [, setPageWrapperData] = useAtom(pageWrapperDataAtom);

  const getTicket = useCallback(() => {
    axios
      .get(`/api/ticket/${ticketId}/`)
      .then(({ data }) => {
        setTicket(data);
      })
      .catch(() => setTicket(null));
  }, [setTicket]);

  useEffect(() => {
    setTicket(undefined);
    getTicket();
  }, [setTicket, getTicket]);

  useEffect(() => {
    setPageWrapperData({
      header: ticket?.id ? `Ticket #${ticket?.id}` : "",
      title: "Your Ticket is ready!",
    });
  }, [ticket]);

  if (ticket === undefined) {
    return <LoadingScreen />;
  }

  if (ticket === null || ticketId === undefined) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex w-full max-w-xl flex-col gap-4 border border-gray-300 bg-white p-4">
      <div className="font-medium text-gray-900">Order #{ticket.id}</div>
      <div className="flex flex-col gap-4 text-sm text-gray-600">
        <div>
          <div className="flex flex-col gap-4 text-sm text-gray-600">
            {!ticket.paid ? (
              <div className="flex flex-col gap-4">
                <div>
                  Thank you for your interest in participating in "
                  {ticket.lottery.name}" lottery. To pay for your ticket you
                  have to transfer{" "}
                  <b>
                    {ticket.lottery.price} {ticket.lottery.symbol}
                  </b>{" "}
                  to the following address{" "}
                  <b className="break-all">{ticket.address}</b>.
                </div>
                <div>
                  Once the transaction is completed, please click on the
                  validate button down bellow or refresh this page.
                </div>
              </div>
            ) : (
              <div>
                You have successfully purchased this ticket. We wish you the
                best and really hope you are the winner of the prize! There's
                nothing else to do here, if you want another ticket you can
                click{" "}
                <span
                  className="text-blue-500"
                  onClick={() => navigate(`/lottery/${ticket.lottery.id}/pay`)}
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
                  .get(`/api/ticket/${ticket.id}/`)
                  .then(({ data }) => {
                    if (!data.paid) {
                      return toast.error(
                        "We were not able to validate your ticket yet. Please verify you transfer the right amount of coins to the address provided before clicking on validate."
                      );
                    }
                    toast.success(
                      "Ticket validated successfully, you will receive an email with the confirmation."
                    );
                    setTicket(data);
                  })
                  .finally(() => setIsValidating(false));
              }}
              disabled={ticket.paid}
              loading={isValidating}
            >
              {ticket.paid ? "Paid" : "Validate"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
