const Paginator = () => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex text-sm">
        <li>
          <a
            href="#"
            className="ml-0 border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Prev
          </a>
        </li>
        <li>
          <a
            href="#"
            className="border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            1
          </a>
        </li>
        <li>
          <a
            href="#"
            aria-current="page"
            className="border border-gray-300 bg-blue-50 px-3 py-2 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
          >
            2
          </a>
        </li>
        <li>
          <a
            href="#"
            className="border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            3
          </a>
        </li>
        <li>
          <a
            href="#"
            className="border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Paginator;
