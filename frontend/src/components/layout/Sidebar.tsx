import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";

export default function Sidebar() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/");
  };

  return (
    <aside>
      <nav className="sticky top-16 hidden md:flex flex-col gap-3 w-45 xl:w-65 h-[calc(100vh-4rem)] p-4 border-r border-gray-400 bg-white">
        <Link to="/" className="font-medium hover:text-soft-pink">
          Home
        </Link>

        {isAuthenticated ?
        (<>
        <Link to="/create" className="font-medium hover:text-soft-pink">
          Create a Thread
        </Link>
        
        <Link to="/profile" className="font-medium hover:text-soft-pink">
          Profile
        </Link>

        <button type="button" onClick={handleLogout} className="font-medium hover:text-soft-pink text-left cursor-pointer">
          Logout
        </button>
        </>) : (
          <button type="button" onClick={() => navigate("/login")} className="font-medium hover:text-soft-pink text-left cursor-pointer">
            Login
          </button>
        )}
      </nav>
    </aside>
  );
}