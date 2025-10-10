import { useState } from "react";
import { createAdmin } from "../../services/admin.service";

export default function CreateAdminForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    nacionalidad: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await createAdmin(formData);
      alert("✅ Administrador creado correctamente!");
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        nacionalidad: "",
      });
    } catch (error) {
      alert("❌ Error al crear administrador: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg border border-violet-200"
    >
      <h2 className="text-xl font-semibold text-violet-700 mb-4">
        Crear Nuevo Administrador
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
          className="border p-2 rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          name="nacionalidad"
          placeholder="Nacionalidad"
          value={formData.nacionalidad}
          onChange={handleChange}
          required
          className="border p-2 rounded-lg"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition"
      >
        {loading ? "Creando..." : "Crear Administrador"}
      </button>
    </form>
  );
}
