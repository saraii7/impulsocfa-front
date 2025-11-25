import { useEffect, useState } from "react";
import { getUserCampaigns, getDonationsByCampaignId, getCurrentUser } from "../../services/campaign.service";
import { getUserTotal } from "../../services/user.service";
import { toast } from "react-hot-toast";
import { Heart, Calendar, DollarSign, Trophy, Wallet} from "lucide-react"

export default function TodasDonaciones() {
  const [donaciones, setDonaciones] = useState([]);
  const [totalRecaudado, setTotalRecaudado] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDonaciones() {
      try {
        const user = await getCurrentUser();
        const userId = user.id;

        const totalData = await getUserTotal();
        setTotalRecaudado(totalData.total || 0);

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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 bg-white rounded-full"></div>
           
          </div>
          <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Cargando donaciones...
          </p>
        </div>
      </div>
    )

  if (donaciones.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center space-y-6">
          <div className="text-6xl">🎁</div>
          <Trophy className="w-20 h-20 mx-auto text-purple-400 opacity-50" />
          <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Aún no recibiste donaciones
          </p>
          <p className="text-base text-gray-600 max-w-sm mx-auto">
            ¡Comparte tus campañas para comenzar a recibir apoyo de generosos donantes!
          </p>
        </div>
      </div>
    )

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-4">
            
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Donaciones Recibidas
            </h1>
           
          </div>
          <p className="text-lg font-semibold text-gray-700">
            Total de <span className="text-2xl text-purple-600 font-bold">{donaciones.length}</span> donación
            {donaciones.length !== 1 ? "es" : ""} recibida{donaciones.length !== 1 ? "s" : ""}
          </p>
          <p className="text-lg font-semibold text-gray-700 flex items-center justify-center gap-2 mt-2">
            <Wallet className="w-6 h-6 text-purple-600" />
            Monto total recaudado:
            <span className="text-2xl text-purple-600 font-bold">
              ${Number(totalRecaudado).toLocaleString("es-AR", { minimumFractionDigits: 2 })}
            </span>
          </p>

        </div>

        <div className="space-y-4">
          {donaciones.map((don, index) => {
            const colors = [
              { bg: "from-blue-500 to-purple-500", border: "border-blue-200", badge: "bg-blue-100 text-blue-700" },
              {
                bg: "from-purple-500 to-pink-500",
                border: "border-purple-200",
                badge: "bg-purple-100 text-purple-700",
              },
              { bg: "from-pink-500 to-orange-500", border: "border-pink-200", badge: "bg-pink-100 text-pink-700" },
              { bg: "from-orange-500 to-red-500", border: "border-orange-200", badge: "bg-orange-100 text-orange-700" },
              { bg: "from-green-500 to-emerald-500", border: "border-green-200", badge: "bg-green-100 text-green-700" },
            ]
            const color = colors[index % colors.length]

            return (
              <div
                key={don.id_donacion}
                className={`group relative overflow-hidden rounded-2xl border-2 ${color.border} shadow-lg hover:shadow-2xl transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${color.bg} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                />

                <div className="relative p-6 flex items-center gap-5 bg-white/90 backdrop-blur-sm">
                  <div className="relative flex-shrink-0">
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${color.bg} opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-300`}
                    ></div>
                    <img
                      src={don.usuario?.foto_perfil || "/default-user.png"}
                      alt={`${don.usuario?.nombre} ${don.usuario?.apellido}`}
                      className={`relative w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg border-4 border-gradient-r-${color.bg}`}
                    />
                    <Heart
                      className={`absolute -bottom-2 -right-2 w-6 h-6 ${color.badge} rounded-full p-1 shadow-md animate-pulse`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-lg text-gray-900 truncate">
                          {don.usuario?.nombre} {don.usuario?.apellido}
                        </p>

                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-2 ${color.badge} px-4 py-2 rounded-full text-sm font-bold shadow-md`}
                        >
                          <DollarSign className="w-5 h-5" />${don.monto}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 pt-2 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                          <Calendar className="w-4 h-4 text-purple-500" />
                          <span>
                            {new Date(don.fecha).toLocaleDateString("es-ES", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-gray-600 line-clamp-1 flex items-center gap-2">
                          <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
                          {don.titulo_campana}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${color.bg} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-white font-bold text-lg">#{index + 1}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 pt-8 border-t-4 border-gradient-to-r from-purple-300 via-pink-300 to-orange-300 text-center space-y-4">
          <p className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            Falta poco para tu objetivo, Animo!
          </p>
          <p className="text-sm text-gray-600">Cada donación representa el generoso apoyo de personas como estas</p>
        </div>
      </div>
    </main>
  )
}
