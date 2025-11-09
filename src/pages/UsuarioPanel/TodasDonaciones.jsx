import { useEffect, useState } from "react";
import { getUserCampaigns, getDonationsByCampaignId, getCurrentUser } from "../../services/campaign.service";
import { toast } from "react-hot-toast";

export default function TodasDonaciones() {
  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDonaciones() {
      try {
        const user = await getCurrentUser();
        const userId = user.id;

        // Obtener todas las campañas del usuario
        const campaigns = await getUserCampaigns(userId);

        let allDonations = [];

        for (const campaign of campaigns) {
          const donations = await getDonationsByCampaignId(campaign.id_campana);
          const withCampaignInfo = donations.map(d => ({
            ...d,
            titulo_campana: campaign.titulo,
          }));
          allDonations = [...allDonations, ...withCampaignInfo];
        }

        // Ordenar por fecha descendente
        allDonations.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setDonaciones(allDonations);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDonaciones();
  }, []);

  if (loading) return <p className="text-center mt-4">Cargando donaciones...</p>;

  if (donaciones.length === 0)
    return <p className="text-center mt-4">Aún no recibiste donaciones en tus campañas.</p>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Donaciones de tus campañas</h2>

      {donaciones.map((don) => (
        <div
          key={don.id_donacion}
          className="border rounded-xl p-4 flex items-center gap-3 shadow-sm bg-white"
        >
          <img
            src={don.usuario?.foto_perfil || "/default-user.png"}
            alt="Usuario"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <p className="font-medium">
              {don.usuario?.nombre} {don.usuario?.apellido}
            </p>
            <p className="text-gray-600 text-sm">
              Donó ${don.monto} el {new Date(don.fecha).toLocaleDateString()}
            </p>
            <p className="text-sm text-blue-600 font-semibold">
              Campaña: {don.titulo_campana}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
