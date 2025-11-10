import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../services/auth.service";
import { Menu, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null); // NUEVO: Objeto completo del usuario (para avatar y nombre)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // NUEVO: Para desplegable del usuario
  const navigate = useNavigate();

  const updateAuthState = () => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);

    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser); // Guardamos el usuario completo
      setUserRole(parsedUser.rol);
    } else {
      setUser(null);
      setUserRole(null);
    }
  };

  useEffect(() => {
    updateAuthState();
    const handleStorageChange = () => updateAuthState();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      setUserRole(null);
      setUser(null);
      navigate("/iniciarsesion");
      setIsMobileMenuOpen(false);
      setIsDropdownOpen(false);
    } catch (err) {
      console.error("Error al cerrar sesión:", err.message);
      toast.error("Error al cerrar sesión 😕", {
        style: {
          borderRadius: "10px",
          background: "linear-gradient(to right, #fef2f2, #fae8ff)",
          color: "#7e22ce",
          fontWeight: 600,
        },
        iconTheme: {
          primary: "#a855f7",
          secondary: "#fff",
        },
      });
    }
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false); //  Cerrar dropdown al hacer click en un link
  };

  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-blue-200/50 sticky top-0 z-50 shadow-lg shadow-blue-100/20 relative overflow-visible">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-5 relative z-10 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group transition-all duration-300 hover:scale-105"
          onClick={handleLinkClick}
        >
          <div className="flex items-baseline justify-center gap-3 text-4xl sm:text-5xl">
            <span className="font-serif italic bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
              Impulso
            </span>
            <span className="font-bold uppercase bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              CFA
            </span>
          </div>
        </Link>

        {/* Menú desktop */}
        <nav className="hidden sm:flex items-center gap-2">
          <Link
            to="/"
            className="px-4 py-2 text-base font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200"
          >
            Inicio
          </Link>
          <Link
            to="/donar"
            className="px-4 py-2 text-base font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200"
          >
            Donar
          </Link>
          <Link
            to="/nosotros"
            className="px-4 py-2 text-base font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200"
          >
            Nosotros
          </Link>

          {isLoggedIn ? (
            userRole === "administrador" ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin"
                  className="px-4 py-2 text-base font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg shadow-lg shadow-blue-200/50 hover:shadow-violet-200/50 transition-all duration-300"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div className="relative">
                {/* Botón avatar */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-base font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200"
                >
                  <img
                    src={user?.foto_perfil || "/default-avatar.png"}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{user?.nombre || "Usuario"}</span>
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-lg border border-blue-200/60 rounded-2xl shadow-xl shadow-blue-300/30 z-50 transform transition-all duration-200 origin-top-right overflow-hidden ${isDropdownOpen
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                    }`}
                >
                  <div className="py-2 px-2">
                    <Link
                      to="/campanas"
                      className="block px-4 py-3 text-base font-medium text-gray-800 hover:text-violet-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-violet-50 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200/50"
                      onClick={handleLinkClick}
                    >
                      Mis campañas
                    </Link>
                    <Link
                      to="/usuariopanel"
                      className="block px-4 py-3 text-base font-medium text-gray-800 hover:text-violet-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-violet-50 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200/50"
                      onClick={handleLinkClick}
                    >
                      Perfil
                    </Link>
                       <Link
                      to="/todasdonaciones"
                      className="block px-4 py-3 text-base font-medium text-gray-800 hover:text-violet-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-violet-50 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200/50"
                      onClick={handleLinkClick}
                    >
                      Donaciones de tus campañas
                    </Link>
                    <div className="my-1 h-px bg-gradient-to-r from-transparent via-blue-200/40 to-transparent"></div>
                    <button
                      className="w-full text-left px-4 py-3 text-base font-medium text-gray-800 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-xl transition-all duration-200 border border-transparent hover:border-red-200/50"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </div>
            )
          ) : (
            <Link
              to="/iniciarsesion"
              className="px-4 py-2 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg shadow-lg shadow-blue-200/50 hover:shadow-violet-200/50 transition-all duration-300 hover:scale-105"
            >
              Iniciar sesión
            </Link>
          )}
        </nav>

        {/* Menú móvil */}
        <button
          type="button"
          className="sm:hidden p-2 text-blue-600 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Dropdown móvil */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-[1000px] opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
      >
        <nav className="flex flex-col gap-2 py-2 px-4">
          <Link
            to="/"
            className="px-4 py-3 text-base font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
            onClick={handleLinkClick}
          >
            Inicio
          </Link>
          <Link
            to="/donar"
            className="px-4 py-3 text-base font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
            onClick={handleLinkClick}
          >
            Donar
          </Link>
          <Link
            to="/nosotros"
            className="px-4 py-3 text-base font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
            onClick={handleLinkClick}
          >
            Nosotros
          </Link>

          {isLoggedIn ? (
            userRole === "administrador" ? (
              <>
                <Link
                  to="/adminpanel"
                  className="px-4 py-3 text-base font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  onClick={handleLinkClick}
                >
                  Dashboard
                </Link>
                <button
                  className="px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg shadow-lg shadow-blue-200/50 hover:shadow-violet-200/50 transition-all duration-300"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 px-4 py-3">
                  <img
                    src={user?.foto_perfil || "/default-avatar.png"}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{user?.nombre}</span>
                </div>
                <Link
                  to="/usuariopanel"
                  className="px-4 py-3 text-base font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  onClick={handleLinkClick}
                >
                  Panel de usuario
                </Link>
                <Link
                  to="/usuariopanel"
                  className="px-4 py-3 text-base font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  onClick={handleLinkClick}
                >
                  Perfil
                </Link>
                <button
                  className="px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg shadow-lg shadow-blue-200/50 hover:shadow-violet-200/50 transition-all duration-300"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </>
            )
          ) : (
            <Link
              to="/iniciarsesion"
              className="px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg shadow-lg shadow-blue-200/50 hover:shadow-violet-200/50 transition-all duration-300"
              onClick={handleLinkClick}
            >
              Iniciar sesión
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
