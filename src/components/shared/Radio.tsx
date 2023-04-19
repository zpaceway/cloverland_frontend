type RadioProps = {
  label: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Radio = ({ label, ...rest }: RadioProps) => {
  return (
    <div className="flex items-center border border-gray-300 bg-white pl-4">
      <input
        type="radio"
        className="h-4 w-4 border border-gray-300 bg-gray-100 outline-none"
        {...rest}
      />
      <label className="ml-2 w-full py-4 text-sm font-medium text-gray-600">
        {label}
      </label>
    </div>
  );
};

export default Radio;
