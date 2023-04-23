import Link from "./shared/Link";
import { useCustomer } from "../hooks";
import { useNavigate } from "react-router-dom";

type TopBarProps = {
  header: string;
};

const TopBar = ({ header }: TopBarProps) => {
  const { customer } = useCustomer();
  const navigate = useNavigate();

  return (
    <div className="z-50 flex w-full items-center justify-center bg-white p-4 shadow-md">
      <div className="flex w-full max-w-4xl items-center justify-between">
        <div
          className="flex cursor-pointer items-center gap-4"
          onClick={() => navigate("/")}
        >
          <img src="/logo.png" className="h-12 w-12 rounded-full" alt="" />
          <div className="flex flex-col text-sm">
            <div className="font-medium">Cloverland</div>
            <div className="text-gray-600">{header}</div>
          </div>
        </div>
        <div>
          {customer ? (
            <div
              className="h-12 w-12 cursor-pointer overflow-hidden rounded-full"
              onClick={() => navigate("/customer")}
            >
              <img
                src="/user-circle.svg"
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <Link to="/auth">Sign in</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
