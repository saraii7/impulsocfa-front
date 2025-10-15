import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { logout } from "../../services/auth.service"
import { Menu, X } from "lucide-react"

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  // ✅ Nueva función centralizada
  const updateAuthState = () => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);

    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserRole(user.rol);
    } else {
      setUserRole(null);
    }
  };

  useEffect(() => {
    updateAuthState(); // se ejecuta al montar
    const handleStorageChange = () => updateAuthState();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      setUserRole(null);
      navigate("/iniciarsesion");
      setIsMobileMenuOpen(false);
    } catch (err) {
      console.error("Error al cerrar sesión:", err.message);
      alert("Error al cerrar sesión: " + err.message);
    }
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };
  return (
      <header className="bg-white/95 backdrop-blur-xl border-b border-blue-200/50 sticky top-0 z-50 shadow-lg shadow-blue-100/20 relative overflow-hidden">
      {/* fondos y animaciones... */}

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 relative z-10">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 group transition-all duration-300 hover:scale-105"
            onClick={handleLinkClick}
          >
            <div className="flex items-baseline justify-center gap-3 text-3xl sm:text-4xl">
              <span className="font-serif italic bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                Impulso
              </span>
              <span className="font-bold uppercase bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                CFA
              </span>
            </div>
          </Link>

          <button
            type="button"
            className="sm:hidden p-2 text-blue-600 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden sm:flex items-center gap-2">
            {/* Links visibles para todos */}
            <Link
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200"
              to="/"
            >
              Inicio
            </Link>
            <Link
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200"
              to="/donar"
            >
              Donar
            </Link>
            <Link
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200"
              to="/nosotros"
            >
              Nosotros
            </Link>

            {isLoggedIn ? (
              <>
                {/* ✅ CAMBIO: Mostrar Dashboard si es admin, Campañas si es usuario normal */}
                {userRole === "administrador" ? (
                  <Link
                    to="/admin"
                    className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/campanas"
                    className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200"
                  >
                    Campañas
                  </Link>
                )}

                <button
                  type="button"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg shadow-lg shadow-blue-200/50 hover:shadow-violet-200/50 transition-all duration-300 hover:scale-105"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg shadow-lg shadow-blue-200/50 hover:shadow-violet-200/50 transition-all duration-300 hover:scale-105"
                to="/iniciarsesion"
              >
                Iniciar sesión
              </Link>
            )}
          </nav>
        </div>

        {/* menú móvil */}
        <div
          className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-2 py-2">
            {/* Links móviles */}
            <Link
              className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200"
              to="/"
              onClick={handleLinkClick}
            >
              Inicio
            </Link>
            <Link
              className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200"
              to="/donar"
              onClick={handleLinkClick}
            >
              Donar
            </Link>
            <Link
              className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200"
              to="/nosotros"
              onClick={handleLinkClick}
            >
              Nosotros
            </Link>

            {isLoggedIn ? (
              <>
                {/* ✅ CAMBIO menú móvil: lo mismo que arriba */}
                {userRole === "administrador" ? (
                  <Link
                    to="/admin"
                    className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200"
                    onClick={handleLinkClick}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/campanas"
                    className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200"
                    onClick={handleLinkClick}
                  >
                    Campañas
                  </Link>
                )}

                <button
                  type="button"
                  className="px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg shadow-lg shadow-blue-200/50 hover:shadow-violet-200/50 transition-all duration-300"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                className="px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg shadow-lg shadow-blue-200/50 hover:shadow-violet-200/50 transition-all duration-300"
                to="/iniciarsesion"
                onClick={handleLinkClick}
              >
                Iniciar sesión
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
