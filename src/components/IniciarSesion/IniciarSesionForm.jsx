import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from '../../services/auth.service';
import { useNavigate } from "react-router-dom";
import GoogleRegistrarseButton from "../GoogleRegistrarseButton/GoogleRegistrarseButton";



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
      navigate("/home"); 
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      alert("Error al iniciar sesión: " + error.message);
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

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.15)] border border-violet-200 p-8 relative z-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent text-center mb-8 drop-shadow-sm">
          Iniciar Sesión
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <input
              required
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 hover:border-violet-400"
            />
          </div>

          <div>
            <input
              required
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 hover:border-violet-400"
            />
          </div>

          <div className="text-center text-sm">
            <Link
              to="/recuperar-contrasenia"
              className="text-violet-600 hover:text-violet-700 transition-colors duration-300 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-105 border border-violet-300"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-violet-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 text-slate-600">O continúa con</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <GoogleRegistrarseButton />
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <span className="text-slate-600">¿No tenés cuenta? </span>
          <Link
            to="/registrarse"
            className="text-violet-600 hover:text-violet-700 font-semibold transition-colors duration-300 hover:underline"
          >
            Registrate
          </Link>
        </div>
      </div>
    </div>
  );
}


