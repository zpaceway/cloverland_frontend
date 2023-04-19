import { forwardRef } from "react";

type TextFieldProps = {
  label?: string;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, errorMessage, ...rest }: TextFieldProps, ref) => {
    return (
      <div>
        {label && (
          <label className="block text-sm font-medium text-gray-600">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className="block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500"
          {...rest}
        />
        {errorMessage && (
          <div className="text-xs text-rose-400">{errorMessage}</div>
        )}
      </div>
    );
  }
);

export default TextField;
