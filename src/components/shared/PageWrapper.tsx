import TopBar from "../TopBar";

type PageWrapperProps = {
  children: React.ReactNode;
  header: string;
  title: string;
};

const PageWrapper = ({ children, header, title }: PageWrapperProps) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center">
      <TopBar header={header} />
      <div className="flex h-full w-full justify-center overflow-y-auto bg-gray-100 px-4 shadow-md">
        <div className="flex h-full w-full max-w-4xl flex-col">
          <div className="pt-8 text-2xl font-black text-gray-600">{title}</div>
          <div className="py-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
