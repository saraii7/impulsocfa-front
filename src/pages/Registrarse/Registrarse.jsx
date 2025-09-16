import { useState } from "react";
import RegistrarseForm from "../../components/RegistrarseForm/RegistrarseForm";
import GoogleRegistrarseButton from "../../components/GoogleRegistrarseButton/GoogleRegistrarseButton";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import Pattern from "../../components/Pattern";


export default function Registrarse() {
  return (
 <StyledWrapper>
  <Pattern /> {/* Fondo detrás de todo */}
      <div className="container">
        <div className="heading">Registrarse</div>

        <RegistrarseForm />

        <div className="social-account-container">
          <span className="title">O registrate con Google</span>
      
      {/*{<GoogleRegistrarseButton />}*/}
        
                </div>

        <span className="agreement">
          <Link to="/iniciarsesion">¿Ya tenes cuenta? Inicia sesión</Link>
        </span>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`

display: flex;
  justify-content: center;  // centra horizontalmente
  align-items: center;      // centra verticalmente
  position: relative;
  height: 100vh;  // Asegura que ocupe toda la altura de la ventana

  .container {
    max-width: 550px;
    background: linear-gradient(0deg, rgb(255,255,255) 0%, rgb(244,247,251) 100%);
    border-radius: 40px;
    padding: 45px 45px;
    border: 5px solid rgb(255,255,255);
    box-shadow: rgba(133,189,215,0.87) 0px 30px 30px -20px;
    margin: 20px;
    text-align: center;  // centra el contenido dentro de la caja
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: rgba(123, 16, 211, 1);
  }

  .social-account-container {
    margin-top: 25px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .social-account-container .title {
    display: block;
    font-size: 10px;
    color: rgb(170,170,170);
    margin-bottom: 10px;
  }

  .agreement {
    display: block;
    text-align: center;
    margin-top: 15px;
  }

  .agreement a {
    text-decoration: none;
    color: #4400ffff;
    font-size: 14px;
  }
`;




