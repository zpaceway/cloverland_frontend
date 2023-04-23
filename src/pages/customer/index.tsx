import TopBar from "../../components/TopBar";
import { useAtom } from "jotai";
import { customerAtom } from "../../atoms";
import NotFound from "../../components/NotFound";

const CustomerApp = () => {
  const [customer] = useAtom(customerAtom);

  if (!customer) {
    return <NotFound />;
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center bg-gray-100">
      <TopBar subtitle={`${customer.fullName}`} />
      <div className="flex w-full max-w-4xl flex-col">
        <div className="relative h-56 w-full bg-gradient-to-r from-green-400 to-emerald-400">
          <div className="absolute left-4 top-[calc(100%_-_4rem)] h-32 w-32 rounded-full bg-white">
            <img src="/user-circle.svg" className="h-full w-full" alt="" />
          </div>
        </div>
        <div className="flex w-full flex-col p-4">
          <div className="flex flex-col">
            <div className="w-full text-center text-2xl font-black">
              {`${customer.fullName}`.trim()}
            </div>
            <div className="text-center text-gray-600">{customer.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerApp;
