import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import Button from "../ui/Button";
import { FaHome, FaPlus, FaUser, FaSignOutAlt } from "react-icons/fa";

function MobileNav() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/");
  };

  if (isAuthenticated) {
    return (<nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-400 flex justify-around items-center h-18">
      <Link to="/">
        <Button>
          <FaHome />
        </Button>
      </Link>

      <Link to="/profile">
        <Button>
          <FaUser />
        </Button>
      </Link>
      
      <Link to="/create">
        <Button variant="add">
          <FaPlus />
        </Button>
      </Link>

      <Button
        onClick={handleLogout}>
        <FaSignOutAlt />
      </Button>
    </nav>
    );
  }
}

export default MobileNav;