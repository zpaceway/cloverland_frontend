import { forwardRef } from "react";

type SelectProps = {
  label?: string;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, errorMessage, children, ...rest }: SelectProps, ref) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-600">
          {label}
        </label>
        <select
          ref={ref}
          className="block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500"
          {...rest}
        >
          {children}
        </select>
        {errorMessage && (
          <div className="text-xs text-rose-400">{errorMessage}</div>
        )}
      </div>
    );
  }
);

export default Select;
