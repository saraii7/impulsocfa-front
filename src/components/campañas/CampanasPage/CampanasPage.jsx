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
  const [showRules, setShowRules] = useState(false)


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
            src={imagen || "/placeholder.svg"}
            alt={c.titulo}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          />
          {imagenes.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {imagenes.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === currentIndex ? "bg-violet-600" : "bg-violet-300"}`}
                />
              ))}
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          {c.titulo}
        </h2>

        <p className="text-slate-700 mb-4 line-clamp-3">{c.descripcion}</p>

        <div className="flex justify-between items-start text-sm mb-3">
          {/* Izquierda: montos */}
          <div className="flex flex-col">
            <span className="text-violet-600 font-semibold">
              🎯 Meta: ${Number(c.monto_objetivo).toLocaleString("es-AR")}
            </span>
            <span className="text-emerald-600 font-semibold">
              💰 Recaudado: ${Number(c.monto_actual || 0).toLocaleString("es-AR")}
            </span>
          </div>

          {/* Derecha: fecha de finalización */}
          <div className="text-right">
            <span className="block text-violet-600 font-semibold">📅 Fecha de finalización:</span>
            <span className="text-slate-700 font-medium">
              {new Date(c.tiempo_objetivo).toLocaleDateString("es-AR")}
            </span>
          </div>
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
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200/40 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            Mis Campañas
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <button
              onClick={() => setShowRules(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl 
               bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500
               text-white font-semibold
               shadow-md hover:shadow-lg
               transition-all duration-300
               border border-amber-300/50"
            >
              <span className="text-lg">⚠️</span>
              <span>Reglas importantes</span>
            </button>

            <button
              onClick={() => navigate("/crearcampana")}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 hover:from-blue-600 hover:via-violet-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 border border-violet-400/50"
            >
              Crear Campaña
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-700 text-lg">Cargando campañas...</p>
          </div>
        ) : (
          <>
            {/* Aprobadas */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-green-600">Aprobadas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.length > 0 ? (
                  campaigns.map((c) => <Card key={c.id_campana} c={c} showButton={true} />)
                ) : (
                  <p className="text-center text-slate-700 col-span-full">No hay campañas aprobadas.</p>
                )}
              </div>
            </section>

            {/* Pendientes */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-yellow-600">Pendientes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingCampaigns.length > 0 ? (
                  pendingCampaigns.map((c) => <Card key={c.id_campana} c={c} showButton={false} />)
                ) : (
                  <p className="text-center text-slate-700 col-span-full">No hay campañas pendientes.</p>
                )}
              </div>
            </section>

            {/* Rechazadas */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-red-600">Rechazadas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rejectedCampaigns.length > 0 ? (
                  rejectedCampaigns.map((c) => <Card key={c.id_campana} c={c} showButton={false} />)
                ) : (
                  <p className="text-center text-slate-700 col-span-full">No hay campañas rechazadas.</p>
                )}
              </div>
            </section>
          </>
        )}
      </div>
 {showRules && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative animate-[fadeIn_0.3s_ease]">
            {/* Cerrar */}
            <button
              onClick={() => setShowRules(false)}
              className="absolute right-4 top-4 text-slate-500 hover:text-slate-700 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
              Reglas importantes para crear campañas
            </h2>

            <div className="space-y-4 text-slate-700">
              <p>
                Para mantener{" "}
                <span className="font-semibold text-violet-600">seguridad, transparencia y confianza</span> en nuestra
                comunidad, todas las campañas deben cumplir estas reglas:
              </p>

              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold">Chequeá con frecuencia tu campaña.</span> para estar al tanto de como va tu progreso.
                </li>

                <li>
                  <span className="font-semibold text-violet-700">Al llegar al 50% del objetivo</span>, es obligatorio
                  subir una
                  <span className="font-semibold"> historia o actualización</span> con evidencia: fotos, videos,
                  comprobantes o cualquier material que demuestre el avance y la veracidad, <span className="font-semibold text-violet-700">Al llegar al 100% del objetivo aplica lo mismo</span>.
                </li>

                <li>Mantener fotos actualizadas y datos claros es clave para que los donantes confíen en vos.</li>

                <li className="text-red-600 font-semibold">
                  Si pasan 48 horas desde que alcanzaste el 50% y no subiste una historia, la campaña será suspendida
                  automáticamente.
                </li>

                <li className="text-red-600 font-semibold">
                  Si la falta de actualización persiste,{" "}
                  <span className="underline">tu cuenta también podrá ser suspendida.</span>
                </li>
                <li className="text-red-600 font-semibold">
                  Si la falta de actualización persiste una vez finalizada tu campaña,{" "}
                  <span className="underline">tu cuenta también podrá ser suspendida.</span>
                </li>
              </ul>

              <p>Queremos que cada campaña sea confiable y segura. Estas reglas nos ayudan a proteger a todos 🤝</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowRules(false)}
                className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg shadow transition"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
