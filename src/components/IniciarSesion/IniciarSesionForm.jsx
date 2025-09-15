import React, { useState } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import Pattern from '../../components/Pattern';
import { login } from '../../services/auth.service';
import { useNavigate } from "react-router-dom";



export default function IniciarSesionForm() {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData.email, formData.password);
      console.log("Usuario logueado:", data);
      alert("Inicio de sesión exitoso!");
      // access_token ya se guarda en localStorage dentro de login
      navigate("/home"); // Redirige a la página principal
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      alert("Error al iniciar sesión: " + error.message);
    }
  };
  
  return (
    
    <StyledWrapper>
      <Pattern /> {/* Fondo detrás de todo */}
      <div className="container">
        <div className="heading">Iniciar Sesión</div>
        <form className="form">
          <input required className="input" type="email" name="email" id="email" placeholder="E-mail" />
          <input required className="input" type="password" name="password" id="password" placeholder="Contraseña" />
          <span className="forgot-password"><Link to="/recuperar-contrasenia">¿Olvidaste tu contraseña?</Link></span>
          <input className="login-button" type="submit" defaultValue="Iniciar" />
        </form>
        <div className="social-account-container">
          <span className="title">O inicia Sesión con Google</span>
          <div className="social-accounts">
            <button className="social-button google">
              <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512">
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg></button>
          </div>
        </div>
        <span className="agreement">
            <Link to="/registrarse">¿No tenes cuenta? Registrate</Link>
            </span>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;  // centra horizontalmente
  align-items: center;      // centra verticalmente
  

  .container {
    max-width: 550px;
    background: linear-gradient(0deg, rgb(255,255,255) 0%, rgb(244,247,251) 100%);
    border-radius: 40px;
    padding: 45px 45px;
    border: 5px solid rgb(255,255,255);
    box-shadow: rgba(133,189,215,0.87) 0px 30px 30px -20px;
    margin: 30px;  // podés mantenerlo para separación si hay varias cajas
    text-align: center;  // centra el contenido dentro de la caja
  }

  .heading {
    font-weight: 900;
    font-size: 30px;
    color: rgba(102, 11, 187, 1);
    margin-bottom: -40px;
  }

  .form {
    margin-top: 80px;
  }

  .form .input {
    width: 100%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
  }

  .form .input::-moz-placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input::placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input:focus {
    outline: none;
    border-inline: 2px solid #6816ebff;
  }

  .form .forgot-password {
    display: block;
    margin-top: 10px;
    margin-left: 10px;
  }

  .form .forgot-password a {
    font-size: 11px;
    color: #0059ffff;
    text-decoration: none;
  }

  .form .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(45deg, rgba(91, 16, 211, 1) 0%, rgb(18, 177, 209) 100%);
    color: white;
    padding-block: 15px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  .form .login-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
  }

  .form .login-button:active {
    transform: scale(0.95);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
  }

  .social-account-container {
    margin-top: 25px;
  }

  .social-account-container .title {
    display: block;
    text-align: center;
    font-size: 10px;
    color: rgb(170, 170, 170);
  }

  .social-account-container .social-accounts {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 5px;
  }

  .social-account-container .social-accounts .social-button {
    background: linear-gradient(45deg, rgba(7, 65, 224, 1) 0%, rgba(221, 35, 35, 1) 100%);
    border: 5px solid white;
    padding: 5px;
    border-radius: 50%;
    width: 40px;
    aspect-ratio: 1;
    display: grid;
    place-content: center;
    box-shadow: rgba(103, 40, 116, 0.88) 0px 12px 10px -8px;
    transition: all 0.2s ease-in-out;
  }

  .social-account-container .social-accounts .social-button .svg {
    fill: white;
    margin: auto;
  }

  .social-account-container .social-accounts .social-button:hover {
    transform: scale(1.2);
  }

  .social-account-container .social-accounts .social-button:active {
    transform: scale(0.9);
  }

  .agreement {
    display: block;
    text-align: center;
    margin-top: 15px;
  }

  .agreement a {
    text-decoration: none;
    color: #0099ff;
    font-size: 13px;
  }`;

