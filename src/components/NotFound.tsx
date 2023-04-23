import TopBar from "./TopBar";

const NotFound = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center bg-gray-100">
      <TopBar subtitle="Not found" />
      <div className="grid h-full w-full place-items-center overflow-y-auto p-4">
        <div className="max-w-sm bg-white p-4 text-gray-900">
          404, Sorry, but the page you are looking for does not exists. Please,
          make sure the link is not broken if you copied it from an external
          source. If you are not sure why this is happening you can contact us
          by following{" "}
          <a href="" className="text-blue-500">
            this
          </a>{" "}
          link.
        </div>
      </div>
    </div>
  );
};

export default NotFound;
