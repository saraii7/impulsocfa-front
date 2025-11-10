import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
  getCurrentUser,
  getUserCampaigns,
  getUserPendingCampaigns,
  getUserRejectedCampaigns
} from "../../../services/campaign.service"
import toast, { Toaster } from "react-hot-toast"


export default function CampanasPage() {
  const [user, setUser] = useState(null)
  const [campaigns, setCampaigns] = useState([])
  const [pendingCampaigns, setPendingCampaigns] = useState([])
  const [rejectedCampaigns, setRejectedCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser()
        setUser(user)

        const [ap, pe, re] = await Promise.all([
          getUserCampaigns(user.id),
          getUserPendingCampaigns(user.id),
          getUserRejectedCampaigns(user.id)
        ])

        setCampaigns(ap)
        setPendingCampaigns(pe)
        setRejectedCampaigns(re)
      } catch (err) {
        console.error(err)
        toast.error("Error al obtener campañas 😕")
        navigate("/login")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [navigate])

  // Card visual reutilizable
  const Card = ({ c, showButton }) => {
    const imagenes = [c.foto1, c.foto2, c.foto3].filter(Boolean)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [intervalId, setIntervalId] = useState(null)

    const handleMouseEnter = () => {
      if (imagenes.length > 1) {
        const interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % imagenes.length)
        }, 1000)
        setIntervalId(interval)
      }
    }

    const handleMouseLeave = () => {
      if (intervalId) clearInterval(intervalId)
      setIntervalId(null)
      setCurrentIndex(0)
    }

    const imagen =
      imagenes[currentIndex] ||
      "https://via.placeholder.com/400x300?text=Sin+imagen"

    return (
      <div
        className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl shadow-lg border border-violet-200 p-6 flex flex-col hover:shadow-xl hover:scale-105 transition-all duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden border border-violet-200">
          <img
            src={imagen}
            alt={c.titulo}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          />
          {imagenes.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {imagenes.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === currentIndex ? "bg-violet-600" : "bg-violet-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          {c.titulo}
        </h2>

        <p className="text-slate-700 mb-4 line-clamp-3">{c.descripcion}</p>

        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-violet-600 font-semibold">
            Meta: ${c.monto_objetivo}
          </span>
          <span className="text-violet-600 font-semibold">
            {c.tiempo_objetivo} días
          </span>
        </div>

        {c.estado && (
          <p
            className={`text-sm font-semibold mb-3 ${
              c.estado === "pendiente"
                ? "text-yellow-600"
                : c.estado === "rechazada"
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            Estado: {c.estado}
          </p>
        )}

        {/* Botón solo si showButton es true */}
        {showButton && (
          <Link
            to={`/vermascampana/${c.id_campana}`}
            className="mt-auto inline-block text-violet-600 hover:text-violet-700 font-semibold transition-colors duration-300 hover:underline"
          >
            Ver más →
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50 p-6 relative overflow-hidden">
     

      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e9d5ff_1px,transparent_1px),linear-gradient(to_bottom,#e9d5ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200/40 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            Mis Campañas
          </h1>
          <button
            onClick={() => navigate("/crearcampana")}
            className="px-6 py-3 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-violet-300"
          >
            Crear Campaña
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-700 text-lg">Cargando campañas...</p>
          </div>
        ) : (
          <>
            {/* Aprobadas */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-green-600">
                Aprobadas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.length > 0 ? (
                  campaigns.map((c) => (
                    <Card key={c.id_campana} c={c} showButton={true} />
                  ))
                ) : (
                  <p className="text-center text-slate-700 col-span-full">
                    No hay campañas aprobadas.
                  </p>
                )}
              </div>
            </section>

            {/* Pendientes */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-yellow-600">
                Pendientes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingCampaigns.length > 0 ? (
                  pendingCampaigns.map((c) => (
                    <Card key={c.id_campana} c={c} showButton={false} />
                  ))
                ) : (
                  <p className="text-center text-slate-700 col-span-full">
                    No hay campañas pendientes.
                  </p>
                )}
              </div>
            </section>

            {/* Rechazadas */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-red-600">
                Rechazadas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rejectedCampaigns.length > 0 ? (
                  rejectedCampaigns.map((c) => (
                    <Card key={c.id_campana} c={c} showButton={false} />
                  ))
                ) : (
                  <p className="text-center text-slate-700 col-span-full">
                    No hay campañas rechazadas.
                  </p>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
