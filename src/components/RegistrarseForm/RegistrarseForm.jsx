import { useState } from "react";
import { registerUser } from "../../services/auth.service";
import ReactFlagsSelect from "react-flags-select";
import "./RegistrarseForm.css";

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

  const [loading, setLoading] = useState(false);

  // ✅ Corrige el handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Agrega la función que actualiza el país seleccionado
  const handleCountryChange = (countryCode) => {
    setFormData({ ...formData, nacionalidad: countryCode });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await registerUser(formData);
      alert(
        response.message ||
          "Registro exitoso. Revisa tu correo para confirmar tu cuenta."
      );
    } catch (error) {
      console.error(error);
      alert("Error al registrarse: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-3">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          required
          className="w-1/2 bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 hover:border-violet-400"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          onChange={handleChange}
          required
          className="w-1/2 bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 hover:border-violet-400"
        />
      </div>

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        onChange={handleChange}
        required
        className="bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 hover:border-violet-400"
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={handleChange}
        required
        className="bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 hover:border-violet-400"
      />

      <input
        type="date"
        name="fecha_nacimiento"
        onChange={handleChange}
        className="bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 hover:border-violet-400 [color-scheme:light]"
      />

      {/* ✅ Selector de país */}
      <div className="country-selector-wrapper">
        <ReactFlagsSelect
          selected={formData.nacionalidad}
          onSelect={handleCountryChange}
          searchable
          searchPlaceholder="Buscar país..."
          placeholder="Selecciona tu nacionalidad"
          className="country-select"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-105 border border-violet-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
}
