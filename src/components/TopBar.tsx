import Link from "./shared/Link";
import Button from "./shared/Button";
import { useCustomer } from "../hooks";

type TopBarProps = {
  subtitle: string;
};

const TopBar = ({ subtitle }: TopBarProps) => {
  const { customer } = useCustomer();

  return (
    <div className="flex w-full items-center justify-center bg-white p-4 shadow-md">
      <div className="flex w-full max-w-4xl items-center justify-between">
        <a className="flex cursor-pointer items-center gap-4" href="/">
          <img src="/logo.png" className="h-12 w-12 rounded-full" alt="" />
          <div className="flex flex-col text-sm">
            <div className="font-medium">Cloverland</div>
            <div className="text-gray-600">{subtitle}</div>
          </div>
        </a>
        <div>
          {customer ? (
            <a
              href="/customer"
              className="block h-12 w-12 overflow-hidden rounded-full"
            >
              <img
                src="/user-circle.svg"
                className="h-full w-full object-contain"
              />
            </a>
          ) : (
            <Link href="/auth">Sign in</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
