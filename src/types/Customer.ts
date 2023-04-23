import Order from "./Order";

type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
  orders: Order[];
};

export default Customer;
