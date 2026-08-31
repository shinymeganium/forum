export default function Sidebar() {
  return (
    <aside className="sticky top-16 hidden md:flex flex-col gap-3 w-45 xl:w-65 h-[calc(100vh-4rem)] p-4 border-r border-gray-400 bg-white">
      <a href="#" className="font-medium hover:text-soft-pink">
        Home
      </a>

      <a href="#" className="font-medium hover:text-soft-pink">
        Create Thread
      </a>

      <a href="#" className="font-medium hover:text-soft-pink">
        Profile
      </a>

      <a href="#" className="font-medium hover:text-soft-pink">
        Logout
      </a>
    </aside>
  );
}