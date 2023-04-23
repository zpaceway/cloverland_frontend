import { CgSpinner } from "react-icons/cg";

type ButtonProps = {
  loading?: boolean;
  color?: ButtonColor;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const buttonColorsMapping = {
  primary: "bg-green-500",
  secondary: "bg-blue-500",
  error: "bg-red-500",
};

type ButtonColor = keyof typeof buttonColorsMapping;

const Button = ({
  children,
  disabled,
  loading = false,
  color = "primary",
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`${
        buttonColorsMapping[color]
      } px-6 py-3 text-base text-white outline-none hover:brightness-95 active:brightness-90 ${
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
