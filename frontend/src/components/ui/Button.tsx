type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "add";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
}: ButtonProps) {
  const styles = {
    primary:
      "bg-muted-lavender hover:opacity-80 text-white",
    secondary:
      "bg-soft-pink hover:opacity-80 text-gray-700",
    danger:
      "bg-red-500 hover:bg-red-600 text-white",
    add:
    "bg-pink-400 hover:opacity-80 text-white"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-3 rounded-xl transition font-medium ${styles[variant]}`}
    >
      {children}
    </button>
  );
}