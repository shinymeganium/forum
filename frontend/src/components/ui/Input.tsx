type InputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
};

export default function Input({
  label,
  placeholder,
  type = "text",
}: InputProps) {
  return (
    <div className="">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-soft-pink"
      />
    </div>
  );
}