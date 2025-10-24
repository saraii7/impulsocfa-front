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
      className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 border-violet-100 hover:shadow-xl transition-shadow"
    >
      <h2 className="text-2xl font-bold text-violet-700 mb-6 flex items-center gap-2">
        <span>➕</span> Crear Nuevo Administrador
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="border-2 border-violet-200 p-3 rounded-lg focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
          className="border-2 border-violet-200 p-3 rounded-lg focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          className="border-2 border-violet-200 p-3 rounded-lg focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
          className="border-2 border-violet-200 p-3 rounded-lg focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
        />
        <input
          type="text"
          name="nacionalidad"
          placeholder="Nacionalidad"
          value={formData.nacionalidad}
          onChange={handleChange}
          required
          className="border-2 border-violet-200 p-3 rounded-lg focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition md:col-span-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg"
      >
        {loading ? "Creando..." : "Crear Administrador"}
      </button>
    </form>
  );
}
