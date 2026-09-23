import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/home";
  const isProfile = location.pathname === "/profile";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full bg-white border-b border-[#EAE0D0]">

      {/*  Navbar */}
      <div className="w-full max-w-330 mx-auto px-4 sm:px-6 h-17 sm:h-18 flex items-center justify-between">

        {/* Left Side */}
        <div className="flex items-center gap-4 sm:gap-8">

          {/* Logo */}
          <Link
            to="/home"
            className="flex items-center gap-2.5 shrink-0"
          >
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#F05A5B] flex items-center justify-center"
              style={{
                boxShadow:
                  "0 6px 16px rgba(240, 90, 91, 0.25)",
              }}
            >
              <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-white" />
            </div>

            <span className="text-xl sm:text-2xl font-bold text-[#262522]">
              logo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-1 bg-[#FAF6EF] border border-[#EAE0D0] rounded-full p-1">

            {/* Home */}
            <Link
              to="/home"
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition
                ${
                  isHome
                    ? "bg-white text-[#262522] border border-[#EAE0D0] shadow-[0_2px_10px_rgba(43,42,40,0.08)]"
                    : "text-[#A39C8A] hover:text-[#262522]"
                }
              `}
            >
              Home
            </Link>

            {/* Profile */}
            <Link
              to="/profile"
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition
                ${
                  isProfile
                    ? "bg-white text-[#262522] border border-[#EAE0D0] shadow-[0_2px_10px_rgba(43,42,40,0.08)]"
                    : "text-[#A39C8A] hover:text-[#262522]"
                }
              `}
            >
              Profile
            </Link>

          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* New Post */}
     
          {/* Avatarprofile */}
          <Link
            to="/profile"
            className="relative shrink-0"
          >
            {user?.photo ? (
              <img
                src={user.photo}
                alt={user.username || "avatar"}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#FDECEB]"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#FDECEB] text-[#D9484E] flex items-center justify-center font-semibold text-sm ring-2 ring-[#FDECEB]">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#2FA97C] border-2 border-white" />
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Logout"
            title="Logout"
            className="
              w-10 h-10
              shrink-0
              rounded-full
              border border-[#EAE0D0]
              bg-[#FAF6EF]
              text-[#6E685B]
              flex items-center justify-center
              hover:bg-[#FDECEB]
              hover:text-[#F05A5B]
              hover:border-[#F05A5B]
              transition
            "
          >
            <LogOut size={18} strokeWidth={2.5} />
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden w-full border-t border-[#EAE0D0]">
        <div className="px-3 py-2.5 flex gap-2">

          {/* Mobile Home */}
          <Link
            to="/home"
            className={`
              flex-1
              text-center
              py-2.5
              rounded-full
              text-sm
              font-medium
              transition
              ${
                isHome
                  ? "bg-[#FDECEB] text-[#F05A5B]"
                  : "text-[#A39C8A] hover:bg-[#FAF6EF] hover:text-[#262522]"
              }
            `}
          >
            Home
          </Link>

          {/* Mobile Profile */}
          <Link
            to="/profile"
            className={`
              flex-1
              text-center
              py-2.5
              rounded-full
              text-sm
              font-medium
              transition
              ${
                isProfile
                  ? "bg-[#FDECEB] text-[#F05A5B]"
                  : "text-[#A39C8A] hover:bg-[#FAF6EF] hover:text-[#262522]"
              }
            `}
          >
            Profile
          </Link>

        </div>
      </div>

    </nav>
  );
}