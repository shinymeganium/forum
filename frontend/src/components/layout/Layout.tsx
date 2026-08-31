import Header from "./Header";
import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({
  children,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-pink-50">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8 pb-22">
          {children}
        </main>

        <MobileNav />
      </div>
    </div>
  );
}