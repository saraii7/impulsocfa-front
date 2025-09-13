import "./Header.css";
import logo from "../../assets/logo/impulsoCFAlogo.svg"
import { Link } from "react-router-dom";

function Header() {
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
          <Link className="nav-link fw-bold py-1 px-0" to="/campanas">Campañas</Link>
          <Link className="nav-link fw-bold py-1 px-0" to="/nosotros">Nosotros</Link>
          <Link className="nav-link fw-bold py-1 px-0" to="/iniciarsesion">Iniciar sesión</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;