type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      {children}
    </div>
  );
}