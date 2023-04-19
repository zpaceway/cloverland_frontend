import { CgSpinner } from "react-icons/cg";

type ButtonProps = {
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  disabled,
  loading = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`bg-green-500 px-6 py-4 text-base text-white outline-none hover:brightness-95 active:brightness-90 ${
        disabled ? "opacity-50" : "opacity-100"
      }`}
      disabled={disabled}
      {...rest}
    >
      <div className="relative">
        <div className={`${loading ? "opacity-0" : "opacity-100"}`}>
          {children}
        </div>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <CgSpinner className="animate-spin text-2xl" />
          </div>
        )}
      </div>
    </button>
  );
};

export default Button;
