import styled from "styled-components";
import { Link } from "react-router-dom";
import Pattern from "../../components/Pattern";
import Contrasenia from "../../components/Contrasenia";

export default function RecuperarContrasenia() {
  return (
    <StyledWrapper>
      <Pattern /> {/* Fondo detrás de todo */}
      <div className="container">
        <div className="heading">Cambiar Contraseña</div>
        <Contrasenia />  {/* Form de cambio de contraseña */}
        <span className="agreement a">
          <Link to="/iniciarsesion">¿Ya tenés cuenta? Iniciá sesión</Link>
        </span>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    max-width: 550px;
    background: linear-gradient(0deg, rgb(255,255,255) 0%, rgb(244,247,251) 100%);
    border-radius: 40px;
    padding: 45px 45px;
    border: 5px solid rgb(255,255,255);
    box-shadow: rgba(133,189,215,0.87) 0px 30px 30px -20px;
    margin: 30px;  // podés mantenerlo para separación si hay varias cajas
    text-align: center;
  }

  .heading {
    font-weight: 900;
    font-size: 30px;
    color: rgba(102, 11, 187, 1);
    margin-bottom: -40px;
  }

  .agreement a{
    display: block;
    text-align: center;
    margin-top: 1rem;
    text-decoration: none;
    color: #1696ebff;
  }
`;
