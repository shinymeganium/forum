type TextAreaProps = {
  placeholder?: string;
};

export default function TextArea({
  placeholder,
}: TextAreaProps) {
  return (
    <textarea
      placeholder={placeholder}
      className="w-full min-h-40 px-4 py-2 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-soft-pink"
    />
  );
}