import Ticket from "./Ticket";

type Customer = {
  id: string;
  firstName: string;
  picture?: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
  tickets: Ticket[];
};

export default Customer;
