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
      <div className="flex h-full w-full justify-center bg-gray-100 p-4 shadow-md">
        <div className="flex w-full max-w-4xl flex-col gap-8 py-8">
          <div className="text-2xl font-black text-gray-600">{title}</div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
