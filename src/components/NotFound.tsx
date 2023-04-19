const NotFound = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 p-4">
      <div className="max-w-sm bg-white p-4 text-gray-900">
        404, The lottery you are looking for does not exists or the period for
        buying tickets already expired. If that is the case you can search for
        the lottery following{" "}
        <a href="" className="text-blue-500">
          this
        </a>{" "}
        link.
      </div>
    </div>
  );
};

export default NotFound;
