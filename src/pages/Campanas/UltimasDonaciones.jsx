import { useEffect, useState } from "react";
import { getLatestDonations } from "../../services/campaign.service";
import { toast } from "react-hot-toast";
import { Ticket, HeartHandshake } from "lucide-react"; // Ícono estilo "recibo"

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
   <div className="mt-12 pt-8 border-t border-violet-200">
      {/* TÍTULO DE SECCIÓN */}
      <div className="flex items-center gap-3 mb-8">
        <HeartHandshake className="w-7 h-7 text-violet-600" />
        <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Últimas donaciones
        </h3>
      </div>

      <div >
        {donaciones.length === 0 ? (
          <div className="text-center py-10">
            <HeartHandshake className="w-12 h-12 text-violet-300 mx-auto mb-3" />
            <p className="text-slate-500 text-lg font-medium">
              Aún no hay donaciones
            </p>
            <p className="text-slate-400 text-sm">
              Cuando alguien done, verás el detalle aquí.
            </p>
          </div>
        ) : (
          <ul className="space-y-5">
            {donaciones.map((d) => (
              <li
                key={d.id_donacion}
                className="bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-violet-200 hover:border-violet-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  {/* IZQUIERDA */}
                  <div className="flex items-center gap-3">
                    <img
                      src={d.usuario?.foto_perfil || "/default-avatar.png"}
                      alt="donante"
                      className="w-10 h-10 rounded-full object-cover border border-violet-200"
                    />
                    <div>
                      <p className="text-slate-800 font-medium">
                        {d.usuario?.nombre} {d.usuario?.apellido}
                      </p>
                      <p className="text-xs text-slate-500">
                        Donación #{d.id_donacion}
                      </p>
                    </div>
                  </div>

                  {/* DERECHA */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleReceipt(d.id_donacion)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-violet-100 text-violet-700 text-xs font-semibold rounded-lg border border-violet-200 shadow-sm hover:bg-violet-200 hover:-translate-y-[2px] active:scale-95 transition-all"
                    >
                      <Ticket size={14} />
                      Comprobante
                    </button>

                    <span className="text-green-600 font-semibold text-lg">
                      ${d.monto.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* DESPLEGABLE */}
                {openReceipt === d.id_donacion && (
                  <div
                    className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200"
                    style={{ animation: "slideDown 0.25s ease-out" }}
                  >
                    <p className="font-medium text-blue-900">
                      Aquí aparecerá el comprobante de pago
                    </p>
                    <p className="text-blue-700 text-xs mt-1">
                      Pronto podrás ver una vista previa del archivo cargado.
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
