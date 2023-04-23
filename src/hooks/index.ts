import { useAtom } from "jotai";
import { customerCredentialsAtom, customerObjectAtom } from "../atoms";

export const useCustomer = () => {
  const [customerObject, setCustomerObject] = useAtom(customerObjectAtom);
  const [customerCredentails, setCustomerCredentials] = useAtom(
    customerCredentialsAtom
  );

  return {
    customer: customerObject,
    setCustomer: setCustomerObject,
    credentials: customerCredentails,
    setCredentials: setCustomerCredentials,
    signOut: () => {
      setCustomerCredentials({ customerId: "", customerSecret: "" });
      setCustomerObject(null);
    },
  };
};
