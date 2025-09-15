import "./Header.css";
import logo from "../../assets/logo/impulsoCFAlogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rol, setRol] = useState(null);
  const navigate = useNavigate();

  // Función para actualizar estado de login y rol
  const updateAuthState = () => {
    const token = localStorage.getItem("access_token");
    const llave = localStorage.getItem("llave_maestra");
    const storedRol = localStorage.getItem("rol");

    if (token && llave) {
      setIsLoggedIn(true);
      setRol(storedRol || null);
    } else {
      setIsLoggedIn(false);
      setRol(null);
    }
  };

  useEffect(() => {
    updateAuthState();

    // Escuchar cambios en localStorage desde otras pestañas o acciones
    const handleStorageChange = () => updateAuthState();
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("llave_maestra");
    localStorage.removeItem("rol");
    setIsLoggedIn(false);
    setRol(null);
    navigate("/home");
  };

  return (
    <header className="mb-auto">
      <div className="d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Link
          to="/home"
          className="d-flex align-items-center mb-2 mb-md-0 text-decoration-none"
        >
          <img src={logo} alt="Logo Impulso CFA" className="logo" />
        </Link>

        {/* Navegación */}
        <nav className="nav nav-masthead justify-content-center">
          <Link className="nav-link fw-bold py-1 px-0" to="/home">
            Inicio
          </Link>
          <Link className="nav-link fw-bold py-1 px-0" to="/donar">
            Donar
          </Link>
          <Link className="nav-link fw-bold py-1 px-0" to="/nosotros">
            Nosotros
          </Link>
          {isLoggedIn ? (
            <>
              <Link className="nav-link fw-bold py-1 px-0" to="/campanas">
                Campañas
              </Link>
              {rol === "administrador" && (
                <Link className="nav-link fw-bold py-1 px-0" to="/admin">
                  Panel Admin
                </Link>
              )}
              <button
                type="button"
                className="nav-link fw-bold py-1 px-0 btn-logout"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link fw-bold py-1 px-0" to="/iniciarsesion">
                Iniciar sesión
              </Link>

            </>
          )}

      
        </nav>
      </div>
    </header>
  );
}

export default Header;
