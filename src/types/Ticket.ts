import Customer from "./Customer";
import Lottery from "./Lottery";

type Ticket = {
  id: string;
  address: string;
  paid: boolean;
  lottery: Lottery;
  customer: Customer;
  createdAt: string;
  updatedAt: string;
  walletAddressLink: string;
};

export default Ticket;
