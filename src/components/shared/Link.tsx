import { CgSpinner } from "react-icons/cg";
import { Link, LinkProps } from "react-router-dom";

type LinkAppProps = {
  loading?: boolean;
  color?: LinkColor;
} & LinkProps;

const linkColorsMapping = {
  primary: "bg-green-500",
  secondary: "bg-blue-500",
  error: "bg-red-500",
};

type LinkColor = keyof typeof linkColorsMapping;

const AppLink = ({
  children,
  loading = false,
  color = "primary",
  ...rest
}: LinkAppProps) => {
  return (
    <Link
      className={`block ${linkColorsMapping[color]} px-8 py-3 text-base text-white shadow-md outline-none hover:brightness-95 active:brightness-90`}
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
    </Link>
  );
};

export default AppLink;
