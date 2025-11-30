import { useEffect, useState } from "react";
import { getLatestDonations } from "../../services/campaign.service";
import { toast } from "react-hot-toast";
import { Ticket } from "lucide-react"; // Ícono estilo "recibo"

export default function UltimasDonaciones({ id_campana, token }) {
  const [donaciones, setDonaciones] = useState([]);
  const [openReceipt, setOpenReceipt] = useState(null);

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

  const toggleReceipt = (id) => {
    setOpenReceipt(openReceipt === id ? null : id);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      {/* ANIMACIÓN GLOBAL */}
      <style>
        {`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-6px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        Últimas donaciones
      </h3>

      {donaciones.length === 0 ? (
        <p className="text-gray-500 text-sm">Aún no hay donaciones</p>
      ) : (
        <ul className="space-y-4">
          {donaciones.map((d) => (
            <li key={d.id_donacion} className="border-b border-gray-100 pb-3">
              <div className="flex items-center justify-between">

                {/* IZQUIERDA: Avatar + nombre */}
                <div className="flex items-center gap-2">
                  <img
                    src={d.usuario?.foto_perfil || "/default-avatar.png"}
                    alt="donante"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="text-gray-800 text-sm font-medium">
                    {d.usuario?.nombre} {d.usuario?.apellido}
                  </span>
                </div>

                {/* DERECHA: Botón animado + monto */}
                <div className="flex items-center gap-3">

                  {/* BOTÓN ESTÉTICO + ANIMACIÓN */}
                  <button
                    onClick={() => toggleReceipt(d.id_donacion)}
                    className="
                      flex items-center gap-1 px-3 py-1.5
                      bg-violet-100 text-violet-700 text-xs font-semibold
                      rounded-lg shadow-sm border border-violet-200
                      transition-all duration-150
                      hover:bg-violet-200 hover:-translate-y-[2px]
                      active:scale-95
                    "
                  >
                    <Ticket size={14} strokeWidth={2} />
                    Comprobante
                  </button>

                  {/* MONTO */}
                  <span className="text-green-600 font-semibold">
                    ${d.monto.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* MINI PESTAÑA DESPLEGABLE ANIMADA */}
              {openReceipt === d.id_donacion && (
                <div
                  className="
                    mt-3 p-4 rounded-xl
                    bg-[#E3F2FD] border border-[#BBDEFB]
                    shadow-sm text-sm text-slate-700
                  "
                  style={{ animation: "slideDown 0.25s ease-out" }}
                >
                  <p className="font-medium text-[#0D47A1]">
                    Aquí se verán los comprobantes de pago
                  </p>
                  <p className="text-[#1565C0] text-xs mt-1">
                    Una vista previa estará disponible cuando el comprobante esté cargado.
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
