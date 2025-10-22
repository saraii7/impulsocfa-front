import { useEffect, useState } from "react";
import { getPendingCampaigns, approveCampaign } from "../../services/admin.service";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => { loadCampaigns(); }, []);

  async function loadCampaigns() {
    try {
      const data = await getPendingCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error("❌ Error al cargar campañas pendientes:", error);
    }
  }

  async function handleApprove(campaignId, approved) {
    try {
      if (!campaignId) return;
      const estado = approved ? "aprobada" : "rechazada"; // string que espera backend
      await approveCampaign(campaignId, estado);
      loadCampaigns();
    } catch (error) {
      console.error("❌ Error al actualizar estado de campaña:", error);
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-violet-200">
      <h2 className="text-xl font-semibold text-violet-700 mb-4">Campañas Pendientes</h2>

      {campaigns.length === 0 ? (
        <p className="text-gray-500">No hay campañas pendientes.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-violet-100 text-violet-700">
              <th className="p-2 text-left">Título</th>
              <th className="p-2 text-left">Descripción</th>
              <th className="p-2 text-left">Usuario</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((camp) => (
              <tr key={camp.id_campana} className="border-t">
                <td className="p-2">{camp.titulo}</td>
                <td className="p-2">{camp.descripcion}</td>
                <td className="p-2">
                  {camp.usuario?.nombre
                    ? `${camp.usuario.nombre} ${camp.usuario.apellido}`
                    : camp.id_usuario}
                </td>
                <td className="p-2 space-x-2 text-center">
                  <button onClick={() => handleApprove(camp.id_campana, true)} className="text-green-600 hover:underline">
                    Aprobar
                  </button>
                  <button onClick={() => handleApprove(camp.id_campana, false)} className="text-red-500 hover:underline">
                    Rechazar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
