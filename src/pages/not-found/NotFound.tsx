import { useAtom } from "jotai";
import { pageWrapperDataAtom } from "../../atoms";
import { useEffect } from "react";

const NotFoundPage = () => {
  const [, setPageWrapperData] = useAtom(pageWrapperDataAtom);

  useEffect(() => {
    setPageWrapperData({
      header: "Not found",
      title: "Sorry, this is awkward 😕.",
    });
  }, []);

  return (
    <div className="mb-8 max-w-sm bg-white p-4 text-gray-900">
      404, Sorry, but the page you are looking for does not exists. Please, make
      sure the link is not broken. If you copied it from an external source
      please make sure it is correct. If you are not sure why this is happening
      you can contact us by following{" "}
      <a href="" className="text-blue-500">
        this
      </a>{" "}
      link.
    </div>
  );
};

export default NotFoundPage;
