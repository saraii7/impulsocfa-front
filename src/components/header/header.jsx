import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../services/auth.service";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const updateAuthState = () => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token); // true si hay token, false si no
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
      navigate("/iniciarsesion");
    } catch (err) {
      console.error("Error al cerrar sesión:", err.message);
      alert("Error al cerrar sesión: " + err.message);
    }
  };

  return (
      <header className="bg-slate-950/90 backdrop-blur-xl border-b border-violet-500/20 sticky top-0 z-50 shadow-lg shadow-violet-500/10 relative overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-violet-500/5 to-pink-500/5" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center justify-center sm:justify-start gap-2 group transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
          >
            <div className="h-9 w-28 sm:h-10 sm:w-32 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg shadow-violet-500/30">
              Impulso CFA
            </div>
          </Link>

          {/* Navegación */}
          <nav className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2">
            <Link
              className="px-3 py-2 text-xs sm:text-sm font-semibold text-slate-200 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-all duration-300 border border-transparent hover:border-violet-500/30 hover:shadow-[0_0_12px_rgba(168,85,247,0.3)] text-center"
              to="/"
            >
              Inicio
            </Link>
            <Link
              className="px-3 py-2 text-xs sm:text-sm font-semibold text-slate-200 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-all duration-300 border border-transparent hover:border-violet-500/30 hover:shadow-[0_0_12px_rgba(168,85,247,0.3)] text-center"
              to="/donar"
            >
              Donar
            </Link>
            <Link
              className="px-3 py-2 text-xs sm:text-sm font-semibold text-slate-200 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-all duration-300 border border-transparent hover:border-violet-500/30 hover:shadow-[0_0_12px_rgba(168,85,247,0.3)] text-center"
              to="/nosotros"
            >
              Nosotros
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  className="px-3 py-2 text-xs sm:text-sm font-semibold text-slate-200 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-all duration-300 border border-transparent hover:border-violet-500/30 hover:shadow-[0_0_12px_rgba(168,85,247,0.3)] text-center"
                  to="/campanas"
                >
                  Campañas
                </Link>
                <button
                  type="button"
                  className="px-3 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 hover:from-blue-400 hover:via-violet-400 hover:to-pink-400 rounded-lg shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 border border-violet-400/50 hover:scale-105 col-span-2 sm:col-span-1"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                className="px-3 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 hover:from-blue-400 hover:via-violet-400 hover:to-pink-400 rounded-lg shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 border border-violet-400/50 hover:scale-105 col-span-2 sm:col-span-1 text-center"
                to="/iniciarsesion"
              >
                Iniciar sesión
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
