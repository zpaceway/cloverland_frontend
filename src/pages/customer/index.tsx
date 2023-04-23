import TopBar from "../../components/TopBar";
import AuthPage from "../auth";
import { useCustomer } from "../../hooks";
import PageWrapper from "../../components/shared/PageWrapper";

const CustomerPage = () => {
  const { customer } = useCustomer();

  if (!customer) {
    return <AuthPage />;
  }

  return (
    <PageWrapper header="Auth" title={`Welcome, ${customer.fullName}`}>
      <div className="flex w-full max-w-4xl flex-col">
        <div className="relative h-56 w-full bg-gradient-to-r from-green-400 to-emerald-400">
          <div className="absolute left-4 top-[calc(100%_-_4rem)] h-32 w-32 rounded-full bg-white">
            <img src="/user-circle.svg" className="h-full w-full" alt="" />
          </div>
        </div>
        <div className="mt-8 flex w-full flex-col p-8">
          <div className="flex flex-col">
            <div className="w-full text-center text-2xl font-black">
              {customer.fullName}
            </div>
            <div className="text-center text-gray-600">{customer.email}</div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CustomerPage;
