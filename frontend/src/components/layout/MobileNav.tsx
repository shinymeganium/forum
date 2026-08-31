import { FaHome, FaPlus, FaUser, FaSignOutAlt } from "react-icons/fa";
import Button from "../ui/Button";

function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-400 flex justify-around items-center h-18">
      <Button>
        <FaHome />
      </Button>

      <Button variant="add">
        <FaPlus />
      </Button>

      <Button>
        <FaUser />
      </Button>

      <Button>
        <FaSignOutAlt />
      </Button>
    </nav>
  );
}

export default MobileNav;