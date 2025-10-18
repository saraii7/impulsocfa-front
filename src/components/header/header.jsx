import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { logout } from "../../services/auth.service"
import { Menu, X } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const updateAuthState = () => {
    const token = localStorage.getItem("access_token")
    setIsLoggedIn(!!token)
  }

  useEffect(() => {
    updateAuthState()
    const handleStorageChange = () => updateAuthState()
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      setIsLoggedIn(false)
      navigate("/iniciarsesion")
      setIsMobileMenuOpen(false)
      toast.success("Sesión cerrada correctamente 👋", {
        style: {
          borderRadius: "10px",
          background: "linear-gradient(to right, #ede9fe, #e0f2fe)",
          color: "#4c1d95",
          fontWeight: 600,
        },
        iconTheme: {
          primary: "#7c3aed",
          secondary: "#fff",
        },
      })
    } catch (err) {
      console.error("Error al cerrar sesión:", err.message)
      toast.error("Hubo un error al cerrar sesión 😕", {
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
      })
    }
  }

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      <header className="bg-white/95 backdrop-blur-xl border-b border-blue-200/50 sticky top-0 z-50 shadow-lg shadow-blue-100/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-violet-50/30 to-blue-50/30" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100/20 rounded-full blur-[100px] animate-pulse" />
        <div
          className="absolute top-0 right-1/4 w-64 h-64 bg-violet-100/20 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />

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
                  <Link
                    className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200"
                    to="/campanas"
                  >
                    Campañas
                  </Link>
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
                  <Link
                    className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-violet-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200"
                    to="/campanas"
                    onClick={handleLinkClick}
                  >
                    Campañas
                  </Link>
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
    </>
  )
}
export default Header
