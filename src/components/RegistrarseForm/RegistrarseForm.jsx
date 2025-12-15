import { useState } from "react";
import { registerUser } from "../../services/auth.service";
import ReactFlagsSelect from "react-flags-select";
import toast from "react-hot-toast";
import "./Registrarseform.css";

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

  // Manejar inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    return edad;
  };

  // Manejar selección de país
  const handleCountryChange = (countryCode) => {
    setFormData({ ...formData, nacionalidad: countryCode });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Registrando usuario...", {
      style: {
        background: "#1e1e2f",
        color: "#e2e8f0",
        border: "1px solid rgba(139,92,246,0.4)",
        borderRadius: "12px",
        padding: "12px 16px",
      },
    });
    // Validación +16 (solo front)
    const edad = calcularEdad(formData.fecha_nacimiento);

    if (!formData.fecha_nacimiento) {
      toast.dismiss(toastId);
      toast.error("Tenés que ingresar tu fecha de nacimiento 📅");
      setLoading(false);
      return;
    }

    if (edad < 16) {
      toast.dismiss(toastId);
      toast.error("Debes tener al menos 16 años para registrarte 🚫");
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser(formData);

      toast.dismiss(toastId);
      toast.success(
        response.message ||
        "¡Registro exitoso! 🎉 Revisa tu correo para confirmar tu cuenta.",
        {
          style: {
            background: "#1e1e2f",
            color: "#e2e8f0",
            border: "1px solid rgba(139,92,246,0.4)",
            borderRadius: "12px",
            padding: "12px 16px",
          },
          iconTheme: {
            primary: "#a78bfa",
            secondary: "#1e1e2f",
          },
        }
      );

      // Limpiar formulario tras éxito
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
      console.error(error);
      toast.dismiss(toastId);
      toast.error("Error al registrarse 😕 " + error.message, {
        style: {
          background: "#1e1e2f",
          color: "#e2e8f0",
          border: "1px solid rgba(139,92,246,0.4)",
          borderRadius: "12px",
          padding: "12px 16px",
        },
        iconTheme: {
          primary: "#a78bfa",
          secondary: "#1e1e2f",
        },
      });
    } finally {
      setLoading(false);
    }
  };
  const hoy = new Date();
  const maxFecha = new Date(
    hoy.getFullYear() - 16,
    hoy.getMonth(),
    hoy.getDate()
  )
    .toISOString()
    .split("T")[0];


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Nombre y apellido */}
      <div className="flex gap-3">
        <div className="w-1/2">
          <label className="block text-slate-700 font-semibold mb-2">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            placeholder="Ingresa tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 hover:border-violet-400"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-slate-700 font-semibold mb-2">
            Apellido
          </label>
          <input
            type="text"
            name="apellido"
            placeholder="Ingresa tu apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            className="w-full bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 hover:border-violet-400"
          />
        </div>
      </div>

      {/* Correo electrónico */}
      <div>
        <label className="block text-slate-700 font-semibold mb-2">
          Correo electrónico
        </label>
        <input
          type="email"
          name="email"
          placeholder="Ingresa tu correo"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 hover:border-violet-400"
        />
      </div>

      {/* Contraseña */}
      <div>
        <label className="block text-slate-700 font-semibold mb-2">
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          placeholder="Crea una contraseña"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 hover:border-violet-400"
        />
      </div>

      {/* Fecha de nacimiento */}
      <div>
        <label className="block text-slate-700 font-semibold mb-2">
          Fecha de nacimiento (+16 años)
        </label>
        <input
          type="date"
          name="fecha_nacimiento"
          max={maxFecha}
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          required
          className="w-full bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 ..."
        />

      </div>

      {/* Nacionalidad */}
      <div>
        <label className="block text-slate-700 font-semibold mb-2">
          Nacionalidad
        </label>
        <ReactFlagsSelect
          selected={formData.nacionalidad}
          onSelect={handleCountryChange}
          searchable
          searchPlaceholder="Buscar país..."
          placeholder="Selecciona tu nacionalidad"
          className="country-select"
        />
      </div>

      {/* Foto de perfil */}
      <div>
        <label className="block text-slate-700 font-semibold mb-2">
          Foto de perfil
        </label>

        <div className="flex flex-col items-center justify-center gap-3 bg-violet-50/50 border-2 border-dashed border-violet-300 rounded-xl p-6 text-center hover:border-violet-400 transition-all duration-300">
          {/* Icono o mini preview si ya hay archivo */}
          {formData.foto_perfil ? (
            <img
              src={URL.createObjectURL(formData.foto_perfil)}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border-4 border-violet-300 shadow-md transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center text-violet-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 mb-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <p className="text-sm font-medium text-slate-600">
                No has seleccionado una imagen
              </p>
            </div>
          )}

          {/* Botón estilizado */}
          <label className="cursor-pointer mt-2 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            {formData.foto_perfil ? "Cambiar foto" : "Seleccionar imagen"}
            <input
              type="file"
              name="foto_perfil"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, foto_perfil: e.target.files[0] })
              }
              className="hidden"
            />
          </label>
        </div>
      </div>
      {/* Botón */}
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
