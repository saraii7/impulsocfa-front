import "./Header.css";
import logo from "../../assets/logo/impulsoCFAlogo.svg";
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
    <header className="mb-auto">
      <div className="d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Link to="/home" className="d-flex align-items-center mb-2 mb-md-0 text-decoration-none">
          <img src={logo} alt="Logo Impulso CFA" className="logo" />
        </Link>

        {/* Navegación */}
        <nav className="nav nav-masthead justify-content-center">
          <Link className="nav-link fw-bold py-1 px-0" to="/home">Inicio</Link>
          <Link className="nav-link fw-bold py-1 px-0" to="/donar">Donar</Link>
          <Link className="nav-link fw-bold py-1 px-0" to="/nosotros">Nosotros</Link>

          {isLoggedIn ? (
            <>
              <Link className="nav-link fw-bold py-1 px-0" to="/campanas">Campañas</Link>
              <button
                type="button"
                className="nav-link fw-bold py-1 px-0 btn-logout"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link className="nav-link fw-bold py-1 px-0" to="/iniciarsesion">
              Iniciar sesión
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
