import TopBar from "../../components/TopBar";

const HomePage = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center bg-gray-100">
      <TopBar subtitle="Home" />
      <div className="flex w-full max-w-4xl flex-col">
        Welcome to Cloverland!
      </div>
    </div>
  );
};

export default HomePage;
