import { useState, useEffect } from "react";
import { updateUserProfile, disableUserAccount } from "../../services/user.service";
import toast, { Toaster } from "react-hot-toast";
import "./../../components/RegistrarseForm/Registrarseform.css";
import ReactFlagsSelect from "react-flags-select";
import { useNavigate } from "react-router-dom";

export default function UserProfile({ user, setUserGlobal }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    nacionalidad: "",
    foto_perfil: null,
  });
  const [preview, setPreview] = useState("/default-avatar.png");
  const [saving, setSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setFormData({
        nombre: storedUser.nombre || "",
        apellido: storedUser.apellido || "",
        fecha_nacimiento: storedUser.fecha_nacimiento || "",
        nacionalidad: storedUser.nacionalidad || "",
        foto_perfil: null,
      });
      if (storedUser.foto_perfil) {
        const fotoUrl = storedUser.foto_perfil.startsWith("http")
          ? storedUser.foto_perfil
          : `${import.meta.env.VITE_API_URL}/${storedUser.foto_perfil}`;
        setPreview(fotoUrl);
      } else {
        setPreview("/default-avatar.png");
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto_perfil" && files.length > 0) {
      setFormData((prev) => ({ ...prev, foto_perfil: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const dataToUpdate = { ...formData };
      if (!formData.foto_perfil) delete dataToUpdate.foto_perfil;

      const updatedUser = await updateUserProfile(dataToUpdate);

      if (updatedUser.foto_perfil) {
        const newFotoUrl = updatedUser.foto_perfil.startsWith("http")
          ? updatedUser.foto_perfil
          : `${import.meta.env.VITE_API_URL}/${updatedUser.foto_perfil}`;

        setTimeout(() => setPreview(newFotoUrl), 500);
      }

      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("storage"));

      // ✅ Toast estético de éxito
      toast.success("Perfil actualizado correctamente 💫", {
        style: {
          borderRadius: "10px",
          background: "linear-gradient(to right, #f0f9ff, #ede9fe)",
          color: "#4f46e5",
          fontWeight: 600,
        },
        iconTheme: {
          primary: "#6366f1",
          secondary: "#fff",
        },
      });
    } catch (err) {
      console.error(err);
      // ⚠️ Toast estético de error
      toast.error("Error al actualizar perfil 😕", {
        style: {
          borderRadius: "10px",
          background: "linear-gradient(to right, #fef2f2, #fae8ff)",
          color: "#7e22ce",
          fontWeight: 600,
        },
        iconTheme: {
          primary: "#a855f7",
          secondary: "#fff",
        },
      });
    } finally {
      setSaving(false);
    }
  };
  // NUEVA FUNCIÓN para deshabilitar la cuenta (abre modal en lugar de window.confirm)
  const handleDisableAccount = () => {
    setShowConfirmModal(true);
  };

  // Confirmar deshabilitación
  const confirmDisableAccount = async () => {
    try {
      await disableUserAccount();
      toast.success("Tu cuenta fue deshabilitada correctamente 💤", {
        style: {
          borderRadius: "10px",
          background: "linear-gradient(to right, #f0f9ff, #ede9fe)",
          color: "#4f46e5",
          fontWeight: 600,
        },
        iconTheme: {
          primary: "#6366f1",
          secondary: "#fff",
        },
      });
      // Cerramos sesión y redirigimos
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      setUserGlobal(null);
      window.dispatchEvent(new Event("storage"));
      navigate("/iniciarsesion");
    } catch (err) {
      console.error(err);
      toast.error("Error al deshabilitar la cuenta 😕", {
        style: {
          borderRadius: "10px",
          background: "linear-gradient(to right, #fef2f2, #fae8ff)",
          color: "#7e22ce",
          fontWeight: 600,
        },
        iconTheme: {
          primary: "#a855f7",
          secondary: "#fff",
        },
      });
    } finally {
      setShowConfirmModal(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50 px-6 py-10 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e9d5ff_1px,transparent_1px),linear-gradient(to_bottom,#e9d5ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200/40 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-violet-200 flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
          Mi Perfil
        </h2>

        {/* Foto de perfil */}
        <div className="flex justify-center mb-4">
          <div className="relative group">
            <label className="cursor-pointer block relative">
              <img
                src={preview}
                alt="Perfil"
                className="w-28 h-28 rounded-full object-cover border-4 border-purple-300 shadow-md"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-purple-200/50 opacity-0 group-hover:opacity-100 transition">
                <span className="text-purple-700 font-semibold text-sm">
                  Cambiar
                </span>
              </div>
              <input
                type="file"
                name="foto_perfil"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Inputs */}
        {["nombre", "apellido", "fecha_nacimiento", "nacionalidad"].map((field) => (
          <div key={field}>
            <label className="block text-slate-700 font-semibold mb-2 capitalize">
              {field === "fecha_nacimiento"
                ? "Fecha de nacimiento"
                : field.replace("_", " ")}
            </label>

            {field === "nacionalidad" ? (
              <div className="country-selector-wrapper">
                <ReactFlagsSelect
                  selected={formData.nacionalidad}
                  onSelect={(code) =>
                    setFormData((prev) => ({ ...prev, nacionalidad: code }))
                  }
                  searchable
                  searchPlaceholder="Buscar país..."
                  placeholder="Selecciona tu nacionalidad"
                  className="country-select"
                />
              </div>
            ) : (
              <input
                type={field === "fecha_nacimiento" ? "date" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 hover:border-violet-400"
              />
            )}
          </div>
        ))}

        {/* Botón */}
        <button
          type="submit"
          disabled={saving}
          className="mt-2 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-violet-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {saving ? "Guardando..." : "Actualizar perfil"}
        </button>

        {/* Botón para deshabilitar cuenta */}
        <button
          type="button"
          onClick={handleDisableAccount}
          className="mt-4 bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 hover:from-red-500 hover:via-pink-500 hover:to-rose-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-rose-300"
        >
          Deshabilitar cuenta
        </button>

      </form>
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-violet-200 text-center animate-scaleIn">
            <h3 className="text-2xl font-bold text-violet-700 mb-4">
              ¿Deshabilitar tu cuenta?
            </h3>
            <p className="text-slate-600 mb-6">
              Esta acción desactivará tu cuenta y no podrás acceder hasta que un
              administrador la reactive. ¿Estás segura/o?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-5 py-2 rounded-lg border border-violet-400 text-violet-600 hover:bg-violet-50 transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDisableAccount}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold hover:scale-105 shadow-md transition-all duration-300"
              >
                Sí, deshabilitar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
