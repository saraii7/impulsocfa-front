import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateCampaign } from "../../../services/campaign.service";
import { toast } from "react-hot-toast";

export default function EditarCampana() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    monto_objetivo: "",
    tiempo_objetivo: "",
    imagen: null,
  });

  const [loading, setLoading] = useState(false);

  // Cargar datos actuales de la campaña
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`http://localhost:3000/api/campaigns/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error al cargar campaña");

        setFormData({
          titulo: data.titulo || "",
          descripcion: data.descripcion || "",
          monto_objetivo: data.monto_objetivo || "",
          tiempo_objetivo: data.tiempo_objetivo?.split("T")[0] || "",
          imagen: null,
        });
      } catch (error) {
        console.error(error);
        toast.error("❌ Error al cargar la campaña", {
          style: {
            background: "#fee2e2",
            color: "#991b1b",
            border: "1px solid #fecaca",
            fontWeight: "600",
          },
        });
      }
    };

    fetchCampaign();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Guardando cambios...");

    try {
      await updateCampaign(id, formData);

      toast.success("✅ Campaña actualizada con éxito", {
        id: toastId,
        style: {
          background: "#ecfdf5",
          color: "#065f46",
          border: "1px solid #a7f3d0",
          fontWeight: "600",
        },
      });

      setTimeout(() => navigate("/campanas"), 1200);
    } catch (error) {
      console.error(error);
      toast.error("❌ Error al editar la campaña: " + error.message, {
        id: toastId,
        style: {
          background: "#fee2e2",
          color: "#991b1b",
          border: "1px solid #fecaca",
          fontWeight: "600",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50 px-4 py-8 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e9d5ff_1px,transparent_1px),linear-gradient(to_bottom,#e9d5ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200/40 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 max-w-lg w-full bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-violet-200 flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent text-center mb-4">
          Editar Campaña
        </h2>

        <div>
          <label className="block text-slate-700 font-semibold mb-2">Nombre</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            className="w-full bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-2">Descripción</label>
          <textarea
            name="descripcion"
            rows="4"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className="w-full bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-2">Monto objetivo</label>
          <input
            type="number"
            name="monto_objetivo"
            value={formData.monto_objetivo}
            onChange={handleChange}
            className="w-full bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-2">
            Fecha de finalización
          </label>
          <input
            type="date"
            name="tiempo_objetivo"
            min={today}
            value={formData.tiempo_objetivo}
            onChange={handleChange}
            className="w-full bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400 [color-scheme:light]"
          />
        </div>

        {/* Imagen actual y nueva imagen */}
        <div>
          <label className="block text-slate-700 font-semibold mb-2">
            Imagen actual
          </label>

          {formData.foto1 || formData.foto2 || formData.foto3 ? (
            <div className="flex flex-col items-center mb-4">
              <img
                src={formData.foto1 || formData.foto2 || formData.foto3}
                alt="Imagen actual"
                className="w-40 h-40 object-cover rounded-xl shadow-md border border-violet-200"
              />
              <p className="text-xs text-slate-500 mt-2">Imagen actual de la campaña</p>
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic mb-4">
              Esta campaña no tiene imagen asignada.
            </p>
          )}

          <label className="block text-slate-700 font-semibold mb-2">
            Nueva imagen (opcional)
          </label>

          <div className="flex flex-col items-center justify-center gap-3 bg-violet-50/50 border-2 border-dashed border-violet-300 rounded-xl p-6 text-center hover:border-violet-400 transition-all duration-300">
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
                Subí una nueva imagen (opcional)
              </p>
            </div>

            {/* Botón de subida */}
            <label className="cursor-pointer mt-2 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              Seleccionar imagen
              <input
                type="file"
                name="imagen"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
        </div>


        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}
