import { useState, useEffect } from "react";
import {
  getUserCampaigns,
  getUserPendingCampaigns,
  getUserRejectedCampaigns,
} from "../../services/campaign.service";

export default function UserCampaigns({ userId }) {
  const [approved, setApproved] = useState([]);
  const [pending, setPending] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const [ap, pe, re] = await Promise.all([
          getUserCampaigns(userId),
          getUserPendingCampaigns(),
          getUserRejectedCampaigns(),
        ]);
        setApproved(ap);
        setPending(pe);
        setRejected(re);
      } catch (err) {
        console.error("Error al obtener campañas:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, [userId]);

  if (loading) return <p>Cargando campañas...</p>;

  const renderCampaignList = (list) =>
    list.length ? (
      <ul className="space-y-3">
        {list.map((c) => (
          <li
            key={c.id_campana}
            className="border p-3 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-bold">{c.titulo}</h3>
            <p>{c.descripcion}</p>
            <p className="text-sm text-gray-500">Estado: {c.estado}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p>No hay campañas en esta sección.</p>
    );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-lg mb-2">Aprobadas</h2>
        {renderCampaignList(approved)}
      </div>
      <div>
        <h2 className="font-semibold text-lg mb-2">Pendientes</h2>
        {renderCampaignList(pending)}
      </div>
      <div>
        <h2 className="font-semibold text-lg mb-2">Rechazadas</h2>
        {renderCampaignList(rejected)}
      </div>
    </div>
  );
}
