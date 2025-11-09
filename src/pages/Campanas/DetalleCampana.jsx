import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCampaignById } from "../../services/campaing.service"
import { ArrowLeft, Target, Calendar, TrendingUp, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"
import { createPreference } from "../../services/payment.service"
import Comments from "../../components/comentarios/Comments"
import UltimasDonaciones from "./UltimasDonaciones"

export default function DetalleCampana() {
  const { id } = useParams()
  const navigate = useNavigate()


  const [campana, setCampana] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [amount, setAmount] = useState("")
  const [preferenceId, setPreferenceId] = useState(null)

  //carrusel estado
  const [currentImage, setCurrentImage] = useState(0)

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY)
  }, [])


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

  const porcentaje = campana
    ? Math.min((campana.monto_actual / campana.monto_objetivo) * 100, 100)
    : 0;

  useEffect(() => {
    if (!campana) return
    const imagenes = [campana.foto1, campana.foto2, campana.foto3].filter(Boolean)
    if (imagenes.length <= 1) return // Si hay solo una imagen, no hay carrusel
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imagenes.length)
    }, 3000) // cambia cada 3 segundos
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

  const handleDonate = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      alert("Ingresá un monto válido");
      return;
    }

    try {
      const idPreference = await createPreference({
        amount: parseFloat(amount),
        campaignTitle: campana.titulo,
        campaignId: campana.id_campana,
        userId: user.id_usuario,
      });
      setPreferenceId(idPreference);
    } catch (err) {
      console.error("Error al crear preferencia:", err);
      alert("Hubo un error al procesar el pago, intentá nuevamente");
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <p className="text-slate-700 text-lg">Cargando campaña...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <p className="text-red-600 text-lg">Error: {error}</p>
      </div>
    )
  }

  if (!campana) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <p className="text-slate-700 text-lg">No se encontró la campaña.</p>
      </div>
    )
  }
  const imagenes = [campana.foto1, campana.foto2, campana.foto3].filter(Boolean)
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Fondo con patrón */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e9d5ff_1px,transparent_1px),linear-gradient(to_bottom,#e9d5ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-30" />

      {/* Esferas de luz animadas */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200/40 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 h-full px-6 py-8 md:px-12 lg:px-20">
        {/* Botón volver */}
        <button
          onClick={() => navigate("/donar")}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white border border-violet-200 rounded-lg text-violet-600 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a campañas
        </button>

        {/* Contenedor principal - Ahora full-width con márgenes */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-violet-200 overflow-hidden">
          {/* CARRUSEL DE IMÁGENES */}
          <div className="relative w-full h-80 overflow-hidden flex items-center justify-center bg-violet-50 border-b border-violet-200">
            {imagenes.length === 0 ? (
              <img
                src="https://via.placeholder.com/800x400?text=Sin+imagen"
                alt="Sin imagen"
                className="object-contain w-full h-full"
              />
            ) : (
              <img
                src={imagenes[currentImage]}
                alt={campana.titulo}
                className="object-contain w-full h-full transition-opacity duration-700 ease-in-out"
              />
            )}

            {/* 🟣 Botones solo si hay más de una imagen */}
            {imagenes.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 bg-white/70 hover:bg-white text-violet-700 p-2 rounded-full shadow-md transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 bg-white/70 hover:bg-white text-violet-700 p-2 rounded-full shadow-md transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          <div className="p-8">
            {/* Título y estado */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                {campana.titulo}
              </h1>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${campana.campana_estado === "activa"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-slate-100 text-slate-700 border border-slate-300"
                  }`}
              >
                {campana.campana_estado}
              </span>
            </div>

            {/* Descripción */}
            <p className="text-slate-700 text-lg leading-relaxed mb-8">{campana.descripcion}</p>

            {/* Barra de progreso */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600 font-semibold">Progreso de financiamiento</span>
                <span className="text-violet-600 font-bold text-lg">{porcentaje.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-violet-100 rounded-full h-4 overflow-hidden border border-violet-200">
                <div
                  className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${porcentaje}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-slate-600 text-sm">
                  <span className="font-semibold text-violet-600">${campana.monto_actual}</span> recaudados
                </span>
                <span className="text-slate-600 text-sm">
                  Meta: <span className="font-semibold text-violet-600">${campana.monto_objetivo}</span>
                </span>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl p-4 border border-violet-200">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-6 h-6 text-violet-600" />
                  <span className="text-slate-600 text-sm font-semibold">Meta</span>
                </div>
                <p className="text-2xl font-bold text-violet-600">${campana.monto_objetivo}</p>
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-200">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-violet-600" />
                  <span className="text-slate-600 text-sm font-semibold">Recaudado</span>
                </div>
                <p className="text-2xl font-bold text-violet-600">${campana.monto_actual}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-violet-200">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-6 h-6 text-violet-600" />
                  <span className="text-slate-600 text-sm font-semibold">Duración</span>
                </div>
                <p className="text-2xl font-bold text-violet-600">{campana.tiempo_objetivo} días</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-xl p-4 border border-violet-200">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-6 h-6 text-violet-600" />
                  <span className="text-slate-600 text-sm font-semibold">Inicio</span>
                </div>
                <p className="text-lg font-bold text-violet-600">
                  {new Date(campana.fecha_inicio).toLocaleDateString("es-ES")}
                </p>
              </div>
            </div>

            {/* Formulario de donación */}
            <form onSubmit={handleDonate} className="flex flex-col gap-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Ingresa el monto a donar"
                className="p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 hover:from-blue-500 hover:to-violet-500 text-white font-semibold px-6 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Donar con Mercado Pago
              </button>

              {preferenceId && (
                <div className="mt-4">
                  <Wallet initialization={{ preferenceId }} />
                </div>
              )}
            </form>
            <Comments id_campana={id} />
            <UltimasDonaciones id_campana={id} token={localStorage.getItem("access_token")} />
          </div>
        </div>
      </div>
    </div>
  )
}
