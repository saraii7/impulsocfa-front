import { useState, useEffect } from "react";
import { updateUserProfile } from "../../services/user.service";

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
    setPreview(
      storedUser.foto_perfil 
        ? `${import.meta.env.VITE_API_URL}/${storedUser.foto_perfil}` 
        : "/default-avatar.png"
    );
  }
}, []);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto_perfil" && files.length > 0) {
      setFormData((prev) => ({ ...prev, foto_perfil: files[0] }));
      setPreview(URL.createObjectURL(files[0])); // Preview instantáneo
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setSaving(true);

    // Solo agregamos la foto si hay una nueva
    const dataToUpdate = { ...formData };
    if (!formData.foto_perfil) {
      delete dataToUpdate.foto_perfil; // no tocamos la foto si no se cambió
    }

    const updatedUser = await updateUserProfile(dataToUpdate);

    // Actualizamos preview y localStorage
    setPreview(
      updatedUser.foto_perfil
        ? `${import.meta.env.VITE_API_URL}/${updatedUser.foto_perfil}`
        : "/default-avatar.png"
    );
    localStorage.setItem("user", JSON.stringify(updatedUser));

    window.dispatchEvent(new Event("storage"));
    alert("Perfil actualizado correctamente");
  } catch (err) {
    console.error(err);
    alert("Error al actualizar perfil: " + err.message);
  } finally {
    setSaving(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block font-semibold mb-1">Foto de perfil</label>
        <img
          src={preview}
          alt="Perfil"
          className="w-24 h-24 rounded-full mb-2 object-cover"
        />
        <input type="file" name="foto_perfil" accept="image/*" onChange={handleChange} />
      </div>

      <div>
        <label className="block font-semibold mb-1">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Apellido</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Fecha de nacimiento</label>
        <input
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Nacionalidad</label>
        <input
          type="text"
          name="nacionalidad"
          value={formData.nacionalidad}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
      >
        {saving ? "Guardando..." : "Actualizar perfil"}
      </button>
    </form>
  );
}
