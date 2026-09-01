type InputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange
}: InputProps) {
  return (
    <div className="">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-soft-pink"
      />
    </div>
  );
}