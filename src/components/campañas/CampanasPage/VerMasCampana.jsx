import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCampaignById, suspendCampaign } from "../../../services/campaign.service"
import Comments from "../../comentarios/Comments"
import UltimasDonaciones from "../../../pages/Campanas/UltimasDonaciones"
import { ArrowLeft, Target, Calendar, TrendingUp, Clock, ChevronLeft, ChevronRight, Edit3, Trash2 } from "lucide-react"

export default function VerMasCampana() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [campana, setCampana] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const fetchCampana = async () => {
      try {
        const data = await getCampaignById(id)
        setCampana(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCampana()
  }, [id])

  // Carrusel automático
  useEffect(() => {
    if (!campana) return
    const imagenes = [campana.foto1, campana.foto2, campana.foto3].filter(Boolean)
    if (imagenes.length <= 1) return
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imagenes.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [campana])

  const handlePrev = () => {
    const imagenes = [campana.foto1, campana.foto2, campana.foto3].filter(Boolean)
    setCurrentImage((prev) => (prev - 1 + imagenes.length) % imagenes.length)
  }

  const handleNext = () => {
    const imagenes = [campana.foto1, campana.foto2, campana.foto3].filter(Boolean)
    setCurrentImage((prev) => (prev + 1) % imagenes.length)
  }

  const handleEdit = () => navigate(`/editarcampana/${campana.id_campana}`)

  const handleSuspend = async () => {
    if (confirm("¿Seguro que querés suspender esta campaña?")) {
      try {
        await suspendCampaign(campana.id_campana)
        alert("Campaña suspendida")
        navigate("/campanas") // vuelve al listado
      } catch (err) {
        console.error(err)
        alert("Error al suspender la campaña")
      }
    }
  }

  if (loading) return <p className="text-center py-12">Cargando campaña...</p>
  if (error) return <p className="text-red-600 text-center py-12">{error}</p>
  if (!campana) return <p className="text-center py-12">No se encontró la campaña.</p>

  const imagenes = [campana.foto1, campana.foto2, campana.foto3].filter(Boolean)
  const porcentaje = Math.min((campana.monto_actual / campana.monto_objetivo) * 100, 100)

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50 p-6">
      <button
        onClick={() => navigate("/campanas")}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white border border-violet-200 rounded-lg text-violet-600 font-semibold transition-all"
      >
        <ArrowLeft className="w-5 h-5" /> Volver
      </button>

      {/* Card principal */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-violet-200 overflow-hidden p-6">
        {/* Carrusel */}
        <div className="relative h-80 w-full mb-6 rounded-lg overflow-hidden border border-violet-200 flex items-center justify-center bg-violet-50">
          {imagenes.length === 0 ? (
            <img src="https://via.placeholder.com/800x400?text=Sin+imagen" alt="Sin imagen" />
          ) : (
            <img src={imagenes[currentImage]} alt={campana.titulo} className="w-full h-full object-contain transition-opacity duration-700" />
          )}

          {imagenes.length > 1 && (
            <>
              <button onClick={handlePrev} className="absolute left-3 bg-white/70 p-2 rounded-full shadow-md">
                <ChevronLeft size={24} />
              </button>
              <button onClick={handleNext} className="absolute right-3 bg-white/70 p-2 rounded-full shadow-md">
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Título y estado */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            {campana.titulo}
          </h1>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              campana.campana_estado === "activa"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-slate-100 text-slate-700 border border-slate-300"
            }`}
          >
            {campana.campana_estado}
          </span>
        </div>

        <p className="text-slate-700 mb-6">{campana.descripcion}</p>

        {/* Barra de progreso */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-slate-600 font-semibold">Progreso de financiamiento</span>
            <span className="text-violet-600 font-bold">{porcentaje.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-violet-100 rounded-full h-4 overflow-hidden border border-violet-200">
            <div className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 h-full rounded-full" style={{ width: `${porcentaje}%` }} />
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl p-4 border border-violet-200">
            <Target className="w-6 h-6 text-violet-600 mb-1" />
            <p className="text-slate-600 text-sm">Meta</p>
            <p className="text-2xl font-bold text-violet-600">${campana.monto_objetivo}</p>
          </div>
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-200">
            <TrendingUp className="w-6 h-6 text-violet-600 mb-1" />
            <p className="text-slate-600 text-sm">Recaudado</p>
            <p className="text-2xl font-bold text-violet-600">${campana.monto_actual}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-violet-200">
            <Clock className="w-6 h-6 text-violet-600 mb-1" />
            <p className="text-slate-600 text-sm">Duración</p>
            <p className="text-2xl font-bold text-violet-600">{campana.tiempo_objetivo} días</p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-xl p-4 border border-violet-200">
            <Calendar className="w-6 h-6 text-violet-600 mb-1" />
            <p className="text-slate-600 text-sm">Inicio</p>
            <p className="text-lg font-bold text-violet-600">{new Date(campana.fecha_inicio).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleEdit}
            className="flex-1 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg font-semibold transition"
          >
            Editar
          </button>
          <button
            onClick={handleSuspend}
            className="flex-1 px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg font-semibold transition"
          >
            Suspender
          </button>
        </div>

        {/* Comentarios y últimas donaciones */}
        <Comments id_campana={id} />
        <UltimasDonaciones id_campana={id} token={localStorage.getItem("access_token")} />
      </div>
    </div>
  )
}
