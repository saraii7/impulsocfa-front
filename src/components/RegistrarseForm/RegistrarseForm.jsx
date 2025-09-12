import { useState } from "react";

export default function RegistrarseForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    foto_perfil: "",
    nacionalidad: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al registrar usuario");
      }

      const data = await res.json();
      console.log("Usuario registrado:", data);
      alert("Usuario registrado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al registrarse: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
      <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
      <input type="date" name="fecha_nacimiento" onChange={handleChange} />
      <input type="text" name="nacionalidad" placeholder="Nacionalidad" onChange={handleChange} required />
      <button type="submit">Registrarse</button>
    </form>
  );
}
