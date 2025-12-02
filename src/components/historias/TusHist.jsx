import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHistoryById, updateHistory } from "../../services/history.service";
import { toast } from "react-hot-toast";

export default function EditHist() {
  const { id } = useParams(); // id_historia
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    imagen: null,
  });

  const [loading, setLoading] = useState(true);

  // ============================
  // Cargar historia a editar
  // ============================
  useEffect(() => {
    async function fetchData() {
      try {
        const hist = await getHistoryById(id);

        setFormData({
          titulo: hist.titulo || "",
          descripcion: hist.descripcion || "",
          imagen: null, // imagen nueva se carga aquí
        });
      } catch (err) {
        toast.error("No se pudo cargar la historia");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  // ============================
  // Manejar inputs
  // ============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    setFormData((prev) => ({
      ...prev,
      imagen: e.target.files[0],
    }));
  };

  // ============================
  // Enviar el update
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = new FormData();
      dataToSend.append("titulo", formData.titulo);
      dataToSend.append("descripcion", formData.descripcion);

      if (formData.imagen) {
        dataToSend.append("imagen", formData.imagen);
      }

      await updateHistory(id, dataToSend);

      toast.success("Historia actualizada");
      navigate("/tus-historias");
    } catch (err) {
      toast.error("Error al actualizar la historia");
    }
  };

  if (loading) return <p className="p-4">Cargando...</p>;

  // ============================
  // UI
  // ============================
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-purple-600 mb-4">
        Editar Historia
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div>
          <label className="font-semibold">Título</label>
          <input
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="5"
            className="w-full p-2 border rounded-lg"
            required
          ></textarea>
        </div>

        <div>
          <label className="font-semibold">Imagen (opcional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white py-2 rounded-lg"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
