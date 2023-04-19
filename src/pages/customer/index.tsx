import { useParams } from "react-router-dom";

const Customer = () => {
  const params = useParams();
  console.log(params);
  return <>Works</>;
};

export default Customer;
