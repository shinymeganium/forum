import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-gray-400 bg-white px-6 flex items-center justify-between">
      <h1 className="text-xl font-bold text-soft-pink">
        SoftForum
      </h1>

      <UserMenu />
    </header>
  );
}