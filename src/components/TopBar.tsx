import { useAtom } from "jotai";
import { customerAtom } from "../atoms";
import Link from "./shared/Link";

type TopBarProps = {
  subtitle: string;
};

const TopBar = ({ subtitle }: TopBarProps) => {
  const [customer, setCustomer] = useAtom(customerAtom);

  return (
    <div className="flex w-full items-center justify-center bg-white p-4 shadow-md">
      <div className="flex w-full max-w-4xl items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" className="h-12 w-12 rounded-full" alt="" />
          <div className="flex flex-col text-sm">
            <div className="font-medium">Cloverland</div>
            <div className="text-gray-600">{subtitle}</div>
          </div>
        </div>
        <div>
          <Link href="/auth">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
