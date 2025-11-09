import { useEffect, useState } from "react";
import { getLatestDonations } from "../../services/campaign.service";
import { toast } from "react-hot-toast";

export default function UltimasDonaciones({ id_campana, token }) {
  const [donaciones, setDonaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLatestDonations(id_campana, token);
        setDonaciones(data);
      } catch (error) {
        toast.error("No se pudieron cargar las últimas donaciones");
      }
    };
    fetchData();
  }, [id_campana, token]);

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        Últimas donaciones
      </h3>
      {donaciones.length === 0 ? (
        <p className="text-gray-500 text-sm">Aún no hay donaciones</p>
      ) : (
        <ul className="space-y-3">
          {donaciones.map((d) => (
            <li
              key={d.id_donacion}
              className="flex items-center justify-between border-b border-gray-100 pb-2"
            >
              <div className="flex items-center gap-2">
                <img
                  src={d.usuario?.foto_perfil || "/default-avatar.png"}
                  alt="donante"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-800 text-sm font-medium">
                  {d.usuario?.nombre} {d.usuario?.apellido}
                </span>
              </div>
              <span className="text-green-600 font-semibold">
                ${d.monto.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
