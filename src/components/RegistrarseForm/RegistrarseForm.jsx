import { useState } from "react";
import styled from "styled-components";
import { registerUser } from "../../services/auth.service";

export default function RegistrarseForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    foto_perfil: null,
    nacionalidad: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value || null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      console.log("Usuario registrado:", data);

      // Mensaje de confirmación
    alert("✅ Usuario registrado. Revisa tu correo para confirmar la cuenta.");

    // Limpiar form
    setFormData({
      email: "",
      password: "",
      nombre: "",
      apellido: "",
      fecha_nacimiento: "",
      foto_perfil: null,
      nacionalidad: "",
    });

     } catch (error) {
    alert("❌ " + (error.message || error.error));
    console.error(error);
  }
};

  return (
     <FormStyled onSubmit={handleSubmit}>
      <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} value={formData.nombre} required />
      <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} value={formData.apellido} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} value={formData.password} required />
      <input type="date" name="fecha_nacimiento" onChange={handleChange} value={formData.fecha_nacimiento || ""} />
      <input type="text" name="nacionalidad" placeholder="Nacionalidad" onChange={handleChange} value={formData.nacionalidad} required />
      <button type="submit">Registrarse</button>
     </FormStyled>
  );
}
const FormStyled = styled.form`
  margin-top: 20px;

  input, button {
    width: 100%;
    border-radius: 20px;
    padding: 15px 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border: none;
    font-size: 14px;
  }

  input::placeholder {
    color: rgb(170, 170, 170);
  }

  input:focus {
    outline: none;
    border-inline: 2px solid #12b1d1;
  }

  button {
    background: linear-gradient(45deg, rgba(107, 16, 211, 1) 0%, rgb(18, 177, 209) 100%);
    color: white;
    font-weight: bold;
    border: none;
    cursor: pointer;
    box-shadow: rgba(133, 189, 215, 0.87) 0px 20px 10px -15px;
    transition: all 0.2s ease-in-out;
  }

  button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.87) 0px 23px 10px -20px;
  }

  button:active {
    transform: scale(0.95);
    box-shadow: rgba(133, 189, 215, 0.87) 0px 15px 10px -10px;
  }
`;