import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCampaignById, suspendCampaign } from "../../../services/campaign.service"
import Comments from "../../comentarios/Comments"
import UltimasDonaciones from "../../../pages/Campanas/UltimasDonaciones"
import { ArrowLeft, Target, Calendar, TrendingUp, Clock, ChevronLeft, ChevronRight, Edit3, Trash2 } from "lucide-react"
import { getHistoriesByCampaign } from "../../../services/history.service"
import { toast } from "react-hot-toast";

export default function VerMasCampana() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [campana, setCampana] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentImage, setCurrentImage] = useState(0)
  const [histories, setHistories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campanaData = await getCampaignById(id);
        setCampana(campanaData);

        const historiesData = await getHistoriesByCampaign(id);
        setHistories(historiesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  const history50 = histories.find(h => Number(h.avance_logrado) === 50);
  const history100 = histories.find(h => Number(h.avance_logrado) === 100);

  const tienePendientes =
    (history50 && !history50.editada) ||
    (history100 && !history100.editada);

function toastConfirm(message, onConfirm) {
  toast((t) => (
    <div className=" bg-white p-4 rounded-xl shadow-lg ">
      <p className="text-sm font-medium text-slate-800">{message}</p>

      <div className="flex justify-end gap-2">
        <button
          className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300 text-sm"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancelar
        </button>

        <button
          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm(); // acción confirmada
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  ));
}

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


async function handleSuspender(id) {
  toastConfirm("¿Seguro que querés suspender esta campaña?", async () => {
    try {
      await suspendCampaign(id);
      toast.success("Campaña suspendida correctamente ✅");
      loadCampana(); // o navegar, lo que tengas
    } catch (error) {
      toast.error("❌ Error al suspender campaña");
      console.error(error);
    }
  });
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
            className={`px-4 py-2 rounded-full text-sm font-semibold ${campana.campana_estado === "activa"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-slate-100 text-slate-700 border border-slate-300"
              }`}
          >
            {campana.campana_estado}
          </span>
        </div>

        <p className="text-slate-700 mb-6">{campana.descripcion}</p>
{porcentaje >= 50 && histories.length === 0 && (
  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded-xl shadow-sm">
    <h3 className="text-lg font-semibold text-yellow-700 flex items-center gap-2">
      ⚠️ Tenés que crear una historia de actualización de como va tu campaña
    </h3>
    <p className="text-yellow-800 text-sm mt-1">
      Cuando tu campaña alcanza el 50%, debés crear una historia para mostrar a tus donadores como va su
       donación, toca el boton violeta para crear una historia y atrer posibles donadores como esta yendo tu campaña.
    </p>
    <button
      onClick={() => navigate("/formhist")}
      className="mt-3 px-4 py-2 bg-violet-600 text-white text-sm mt-1 rounded-lg hover:bg-violet-700"
    >
      Crear historia
    </button>
  </div>
)}
{porcentaje >= 100 && histories.length === 0 && (
  <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-xl shadow-sm">
    <h3 className="text-lg font-semibold text-red-700 flex items-center gap-2">
      ⚠️ Necesitás crear la historia final (100%)
    </h3>
    <p className="text-red-800 text-sm mt-1">
      Tu campaña llegó al 100%. Creá la historia final para completar la transparencia.
    </p>
    <button
      onClick={() => navigate("/formhist")}
      className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
    >
      Crear historia
    </button>
  </div>
)}



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
            <p className="text-2xl font-bold text-violet-600">
              ${Number(campana.monto_objetivo).toLocaleString("es-AR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-200">
            <TrendingUp className="w-6 h-6 text-violet-600 mb-1" />
            <p className="text-slate-600 text-sm">Recaudado</p>
            <p className="text-2xl font-bold text-violet-600">
              ${Number(campana.monto_actual).toLocaleString("es-AR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-violet-200">
            <Clock className="w-6 h-6 text-violet-600 mb-1" />
            <p className="text-slate-600 text-sm">Duración</p>
            <p className="text-2xl font-bold text-violet-600">
              {" "}
              {new Date(campana.tiempo_objetivo).toLocaleDateString("es-AR")}{" "}
              (
              {(() => {
                const diasRestantes = Math.ceil(
                  (new Date(campana.tiempo_objetivo) - new Date()) /
                  (1000 * 60 * 60 * 24)
                );
                return diasRestantes > 0
                  ? `faltan ${diasRestantes} ${diasRestantes === 1 ? "día" : "días"}`
                  : diasRestantes === 0
                    ? "finaliza hoy"
                    : "ya finalizó";
              })()}
              )
            </p>
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
            onClick={handleSuspender}
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
