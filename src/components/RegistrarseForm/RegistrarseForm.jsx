
import { useState } from "react";
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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value || null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await registerUser(formData);

      alert(response.message || "Registro exitoso. Revisa tu correo para confirmar tu cuenta.");

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
          className="w-1/2 bg-slate-800/50 border border-violet-500/30 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:border-violet-500/50"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          onChange={handleChange}
          required
          className="w-1/2 bg-slate-800/50 border border-violet-500/30 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:border-violet-500/50"
        />
      </div>

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        onChange={handleChange}
        required
        className="bg-slate-800/50 border border-violet-500/30 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:border-violet-500/50"
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={handleChange}
        required
        className="bg-slate-800/50 border border-violet-500/30 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:border-violet-500/50"
      />

      <input
        type="date"
        name="fecha_nacimiento"
        onChange={handleChange}
        className="bg-slate-800/50 border border-violet-500/30 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:border-violet-500/50 [color-scheme:dark]"
      />

      <input
        type="text"
        name="nacionalidad"
        placeholder="Nacionalidad"
        onChange={handleChange}
        required
        className="bg-slate-800/50 border border-violet-500/30 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:border-violet-500/50"
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 hover:from-blue-500 hover:via-violet-500 hover:to-pink-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:scale-105 border border-violet-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
}