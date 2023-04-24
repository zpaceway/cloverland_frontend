import { CgSpinner } from "react-icons/cg";

const LoadingScreen = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-20 w-20 overflow-hidden">
        <CgSpinner className="animate-spin text-6xl text-blue-500" />
      </div>
    </div>
  );
};

export default LoadingScreen;
