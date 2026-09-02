import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const username = useAuthStore(state => state.username);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  const handleProfile = () => {
    navigate("/profile");
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => navigate("/login")}
          className="cursor-pointer">Login</button>
        <span>/</span>
        <button
          onClick={() => navigate("/register")}
          className="cursor-pointer">Register</button>
      </div>
    );
  }

  return (
    <div
      ref={menuRef}
      className="flex items-center gap-2 cursor-pointer"
    >
      <button
        onClick={() => setOpen(!open)} 
        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-pink-100 transition"
      >
        <div className="w-8 h-8 rounded-full bg-soft-pink" />

        <span className="font-medium">{username}</span>
      </button>

      {open && (<div className="absolute top-15 right-5 mt-2 w-44 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-50">

        <button 
          onClick={handleProfile}
          className="w-full text-left px-4 py-3 hover:bg-pink-50 transition">
            Profile
        </button>

        <button
         onClick={handleLogout}
         className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 transition">
          Logout
         </button>
      </div>)}
    </div>
  );
}