import "./Header.css";
import logo from "../../assets/logo/impulsoCFAlogo.svg"
function Header() {
  return (
     <header className="mb-auto">
      <div className="d-flex align-items-center justify-content-between">
        {/* Logo */}
        <a href="/" className="d-flex align-items-center mb-2 mb-md-0 text-decoration-none">
          <img src={logo} alt="Logo Impulso CFA" className="logo" />
        </a>

        {/* Navegación */}
        <nav className="nav nav-masthead justify-content-center">
          <a className="nav-link fw-bold py-1 px-0" href="#">Donar</a>
          <a className="nav-link fw-bold py-1 px-0" href="#">Campañas</a>
          <a className="nav-link fw-bold py-1 px-0" href="#">Nosotros</a>
          <a className="nav-link fw-bold py-1 px-0" href="#">Iniciar sesión</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;