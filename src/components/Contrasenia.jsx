import { useState } from "react";
import { Link } from "react-router-dom";
import { changePassword } from "../services/auth.service";

export default function Contrasenia() {
  const [formData, setFormData] = useState({
    llave_maestra: "",
    newPassword: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await changePassword(formData.llave_maestra, formData.newPassword);
      setMensaje("✅ " + res.message);
    } catch (error) {
      setMensaje("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50 px-4 relative overflow-hidden">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0e7ff_1px,transparent_1px),linear-gradient(to_bottom,#e0e7ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-30" />

      {/* Esferas de luz animadas */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200/40 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Contenedor principal */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.15)] border border-violet-200 p-8 relative z-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent text-center mb-8 drop-shadow-sm">
          Cambiar Contraseña
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            required
            type="text"
            name="llave_maestra"
            placeholder="Llave maestra"
            value={formData.llave_maestra}
            onChange={handleChange}
            className="w-full bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 hover:border-violet-400"
          />

          <input
            required
            type="password"
            name="newPassword"
            placeholder="Nueva contraseña"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 hover:border-violet-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-105 border border-violet-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? "Cambiando..." : "Cambiar contraseña"}
          </button>

          {mensaje && (
            <p
              className={`text-center font-medium mt-2 ${mensaje.startsWith("✅") ? "text-green-600" : "text-red-600"}`}
            >
              {mensaje}
            </p>
          )}
        </form>

        <div className="mt-6 text-center text-sm">
          <Link
            to="/iniciarsesion"
            className="text-violet-600 hover:text-violet-700 font-semibold transition-colors duration-300 hover:underline"
          >
            ¿Ya tenés cuenta? Iniciá sesión
          </Link>
        </div>
      </div>
    </div>
  );
}