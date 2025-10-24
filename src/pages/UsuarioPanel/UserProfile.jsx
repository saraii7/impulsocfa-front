import { useState, useEffect } from "react";
import { updateUserProfile } from "../../services/user.service";
import toast, { Toaster } from "react-hot-toast";


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
      setPreview(
        updatedUser.foto_perfil
          ? `${import.meta.env.VITE_API_URL}/${updatedUser.foto_perfil}`
          : "/default-avatar.png"
      );
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
              {field.replace("_", " ")}
            </label>
            <input
              type={field === "fecha_nacimiento" ? "date" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 hover:border-violet-400"
            />
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
      </form>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
