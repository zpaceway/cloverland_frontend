import { CgSpinner } from "react-icons/cg";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <CgSpinner className="animate-spin text-6xl text-blue-500" />
    </div>
  );
};

export default LoadingScreen;
