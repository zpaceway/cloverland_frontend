import { useAtom } from "jotai";
import TopBar from "../TopBar";
import { pageWrapperDataAtom } from "../../atoms";

type PageWrapperProps = {
  children: React.ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  const [pageWrapperData] = useAtom(pageWrapperDataAtom);
  return (
    <div className="fixed inset-0 flex flex-col items-center bg-gray-100">
      <TopBar header={pageWrapperData.header} />
      <div className="relative inset-0 h-full w-full overflow-y-auto">
        <div className="relative inset-0 flex h-full w-full justify-center">
          <div className="flex h-full w-full max-w-4xl flex-col">
            <div className="flex h-full flex-col gap-8 px-4">
              <div className="pt-8 text-2xl font-black text-gray-600">
                {pageWrapperData.title}
              </div>
              <div className="relative inset-0 h-full w-full">
                <div className="pb-8">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
