import { useEffect, useState } from "react";
import { getPendingCampaigns, approveCampaign, getCampaignById } from "../../services/admin.service";
import { toast } from "react-hot-toast";
import { Target, Calendar } from "lucide-react";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {
    try {
      setLoading(true);
      // obtener resumen de campañas pendientes
      const summary = await getPendingCampaigns();
      // obtener detalle completo de cada campaña
      const detailedCampaigns = await Promise.all(
        summary.map((c) => getCampaignById(c.id_campana))
      );
      setCampaigns(detailedCampaigns);

    } catch (error) {
      console.error("Error al cargar campañas pendientes:", error);
      toast.error("❌ Error al cargar las campañas pendientes");
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(campaignId, approved) {
    try {
      if (!campaignId) return;
      const estado = approved ? "aprobada" : "rechazada";
      await approveCampaign(campaignId, estado);
      toast.success(
        approved
          ? "✅ Campaña aprobada correctamente"
          : "🚫 Campaña rechazada correctamente"
      );

      loadCampaigns(); // recargar campañas
    } catch (error) {
      console.error(" Error al actualizar estado de campaña:", error);
      toast.error("❌ Error al actualizar el estado de la campaña");
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-700 text-lg">Cargando campañas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50 p-6">
      <h2 className="text-2xl font-bold text-violet-700 mb-6 flex items-center gap-2">
        <span>📢</span> Campañas Pendientes
      </h2>

      {campaigns.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No hay campañas pendientes.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((c) => (
            <div
              key={c.id_campana}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-violet-200 p-6 flex flex-col hover:shadow-md transition-all duration-300"
            >
              {c.foto1 && (
                <img
                  src={c.foto1 || "/placeholder.svg"}
                  alt={c.titulo}
                  className="rounded-lg mb-4 object-cover h-48 w-full border border-violet-200"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{c.titulo}</h3>
              <p className="text-slate-700 mb-3 line-clamp-3">{c.descripcion}</p>

              <div className="flex items-center gap-4 mt-2 text-sm text-slate-700">

                {/* META */}
                <div className="flex items-center gap-2 bg-violet-50 px-3 py-1.5 rounded-lg border border-violet-200">
                  <Target className="w-4 h-4 text-violet-600" />
                  <span className="font-semibold text-violet-700">
                    ${c.monto_objetivo.toLocaleString()}
                  </span>
                </div>

                {/* DURACIÓN */}
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-blue-700">
                    {new Date(c.tiempo_objetivo).toLocaleDateString("es-AR")}
                  </span>

                </div>

              </div>

              {/* DURACIÓN 
              <p className="mt-1 text-sm text-gray-500 font-semibold">
                Usuario: {c.usuario?.nombre ? `${c.usuario.nombre} ${c.usuario.apellido}` : c.id_usuario}
              </p>*/}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleApprove(c.id_campana, true)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-semibold rounded-lg transition-all"
                >
                  ✓ Aprobar
                </button>
                <button
                  onClick={() => handleApprove(c.id_campana, false)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-semibold rounded-lg transition-all"
                >
                  ✕ Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
