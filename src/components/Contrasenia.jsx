import { useState } from "react";
import styled from "styled-components";
import { changePassword } from "../services/auth.service";

export default function Contrasenia() {
  const [formData, setFormData] = useState({
    llave_maestra: "",
    newPassword: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await changePassword(formData.llave_maestra, formData.newPassword);
      setMensaje("✅ " + res.message);
    } catch (error) {
      setMensaje("❌ " + error.message);
    }
  };

  return (
      <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <input
          required
          className="input"
          type="text"
          name="llave_maestra"
          placeholder="Llave maestra"
          value={formData.llave_maestra}
          onChange={handleChange}
        />

        <input
          required
          className="input"
          type="password"
          name="newPassword"
          placeholder="Nueva contraseña"
          value={formData.newPassword}
          onChange={handleChange}
        />

        <input
          className="login-button"
          type="submit"
          value="Cambiar contraseña"
        />

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  .form {
    margin-top: 40px;
  }

  .form .input {
    width: 100%;
    background: white;
    border: none;
    padding: 45px 45px;
    border-radius: 30px;
    margin-top: 14px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
  }

  .form .input::placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input:focus {
    outline: none;
    border-inline: 2px solid #6816ebff;
  }

  .form .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(
      45deg,
      rgba(91, 16, 211, 1) 0%,
      rgb(18, 177, 209) 100%
    );
    color: white;
    padding-block: 15px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: rgba(185, 133, 215, 0.87) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  .form .login-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(178, 133, 215, 0.87) 0px 23px 10px -20px;
  }

  .form .login-button:active {
    transform: scale(0.95);
    box-shadow: rgba(171, 133, 215, 0.87) 0px 15px 10px -10px;
  }

  .mensaje {
    text-align: center;
    margin-top: 10px;
    font-size: 13px;
  }
`;