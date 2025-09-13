import "./Home.css";
import Pattern from "../../components/Pattern";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="d-flex h-100 text-center">
       {/* Fondo Uiverse */}
      <Pattern />
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">


        {/* CONTENIDO PRINCIPAL */}
        <main className="px-3 flex-fill d-flex flex-column justify-content-center">
          <h1>Bienvenido a Impulso CFA</h1>
          <p className="lead">
            Una plataforma transparente y accesible para impulsar campañas sociales.
          </p>
          <p className="lead">
            <Link to="/donar" className="btn btn-lg btn-donar fw-bold">
              Quiero donar ya!
            </Link>
          </p>
        </main>
      </div>
    </div>
    
    
    
  );
}

export default Home;