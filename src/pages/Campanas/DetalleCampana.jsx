import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getCampaignById } from "../../services/campaing.service"
import { ArrowLeft, Target, Calendar, TrendingUp, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"
import { createPreference } from "../../services/payment.service"
import Comments from "../../components/comentarios/Comments"
import UltimasDonaciones from "./UltimasDonaciones"
import toast from "react-hot-toast";
import { getHistoriesByCampaign } from "../../services/history.service";


export default function DetalleCampana() {
  const { id } = useParams()
  const navigate = useNavigate()


  const [campana, setCampana] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [amount, setAmount] = useState("")
  const [preferenceId, setPreferenceId] = useState(null)
  const [llaveMaestra, setLlaveMaestra] = useState("");
  const [histories, setHistories] = useState([]);
  const [hist50, setHist50] = useState([]);
  const [hist100, setHist100] = useState([]);
const isVideo = (url) => {
  if (!url) return false;
  return (
    url.endsWith(".mp4") ||
    url.endsWith(".mov") ||
    url.endsWith(".webm") ||
    url.endsWith(".avi")
  );
};


  //carrusel estado
  const [currentImage, setCurrentImage] = useState(0)

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY)
  }, [])


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


  const porcentaje = campana
    ? Math.min((campana.monto_actual / campana.monto_objetivo) * 100, 100)
    : 0;

  useEffect(() => {
    if (!campana) return
    const imagenes = [campana.foto1, campana.foto2, campana.foto3].filter(Boolean)
    if (imagenes.length <= 1) return // Si hay solo una imagen, no hay carrusel
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imagenes.length)
    }, 5000) // cambia cada 5 segundos
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
      toast.error("Ingresá un monto válido");
      return;
    }

    if (!llaveMaestra.trim()) {
      toast.error("Ingresá tu llave maestra para continuar");
      return;
    }

    try {
      const monto = parseFloat(amount.replace(/\./g, "").replace(",", ".")); // Convierte string formateado a número real

      //  Cálculo de porcentajes
      const comisionMP = monto * 0.03;  // 3%
      const plataforma = monto * 0.02;  // 2%
      const donacion = monto * 0.95;    // 95%

      console.log({
        montoIngresado: monto,
        donacionReal: donacion,
        comisionMP,
        plataforma,
      });

      // Enviamos al backend solo el monto real (95%)
      const idPreference = await createPreference({
        amount: donacion,
        campaignTitle: campana.titulo,
        campaignId: campana.id_campana,
        llave_maestra: llaveMaestra,
      });

      setPreferenceId(idPreference);
      toast.success("Llave maestra verificada correctamente 🎉");
    } catch (err) {
      console.error("Error al crear preferencia:", err);
      toast.error(err.message || "Hubo un error al procesar el pago, intentá nuevamente");
    }
  };

  const formatAmount = (value) => {
    // eliminamos todo excepto dígitos y coma
    let cleanValue = value.replace(/[^\d,]/g, "");

    // separamos parte entera y decimal
    const [integerPart, decimalPart] = cleanValue.split(",");

    // agregamos puntos de miles
    const withDots = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // si hay decimales, los volvemos a agregar con la coma
    return decimalPart !== undefined ? `${withDots},${decimalPart}` : withDots;
  };

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    setAmount(formatAmount(inputValue));
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

        <div className="flex justify-between items-center mb-6">
          {/* Botón volver */}
          <button
            onClick={() => navigate("/donar")}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white border border-violet-200 rounded-lg text-violet-600 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a campañas
          </button>

          {/* Botón reportar */}
          <button
            onClick={() => navigate(`/reportcampana/${campana.id_campana}`)}
            className="px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded-lg hover:bg-red-200 transition"
          >
            Reportar campaña
          </button>
        </div>
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

            {/*  Botones solo si hay más de una imagen */}
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
                <p className="text-2xl font-bold text-violet-600">
                  ${Number(campana.monto_objetivo).toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-200">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-violet-600" />
                  <span className="text-slate-600 text-sm font-semibold">Recaudado</span>
                </div>
                <p className="text-2xl font-bold text-violet-600">
                  ${Number(campana.monto_actual).toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-violet-200">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-6 h-6 text-violet-600" />
                  <span className="text-slate-600 text-sm font-semibold">Duración</span>
                </div>
                <p className="text-2xl font-bold text-violet-600">
                  Finaliza el{" "}
                  {new Date(campana.tiempo_objetivo).toLocaleDateString("es-AR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
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
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-6 h-6 text-violet-600" />
                  <span className="text-slate-600 text-sm font-semibold">Inicio</span>
                </div>
                <p className="text-lg font-bold text-violet-600">
                  {new Date(campana.fecha_inicio).toLocaleDateString("es-ES")}
                </p>
              </div>
            </div>
            {/* AVISO: mostrar SOLO si la campaña llegó >=50% y NO hay historias en hist50 */}
            {porcentaje >= 50 && histories.length === 0 && (
              <div className="mt-6 mb-8 p-5 bg-yellow-50 border border-yellow-300 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-yellow-700 flex items-center gap-2">
                  ⚠️ Atención: esta campaña superó el 50% sin historias verificables
                </h3>
                <p className="text-yellow-800 text-sm mt-1 leading-relaxed">
                  Cuando una campaña alcanza el 50% o más, debería publicar al menos una historia
                  que permita verificar el destino de los fondos. La ausencia de historias
                  reduce el nivel de transparencia; doná con precaución.
                </p>
                <p className="text-yellow-700 text-xs mt-2 italic">
                  Esta donación queda a cargo del usuario que desea contribuir.
                </p>
              </div>
            )}

            {/* Formulario de donación */}
            <form onSubmit={handleDonate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="block text-slate-700 font-semibold mb-1">
                  Monto a donar 💵
                </label>

                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                    $
                  </span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Ingresá el monto a donar"
                    className="pl-8 pr-3 py-3 rounded-lg border border-violet-300 bg-violet-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all duration-300"
                    required
                  />
                </div>

                {/* Desglose dinámico */}
                {amount && (
                  <div className="mt-2 text-xs text-slate-600 bg-violet-50/40 border border-violet-100 rounded-lg p-2">
                    {(() => {
                      const monto = parseFloat(amount.replace(/\./g, "").replace(",", ".")) || 0;
                      const mp = monto * 0.03;
                      const nosotros = monto * 0.02;
                      const donacion = monto * 0.95;

                      return (
                        <>
                          <p>
                            💜 <span className="font-semibold text-violet-600">${donacion.toFixed(2)}</span> se destina a la campaña
                          </p>
                          <p>
                            💳 <span className="font-semibold text-violet-600">${mp.toFixed(2)}</span> cubre tarifas de Mercado Pago
                          </p>
                          <p>
                            ⚙️ <span className="font-semibold text-violet-600">${nosotros.toFixed(2)}</span> se destina al mantenimiento de la plataforma
                          </p>
                          <p className="text-xs text-slate-500 mt-1 italic">
                            Los porcentajes se calculan automáticamente según el monto ingresado.
                          </p>
                        </>
                      );
                    })()}
                  </div>
                )}

              </div>


              {/* Llave maestra */}
              <div className="flex flex-col gap-1">
                <label className="block text-slate-700 font-semibold mb-1">
                  Llave maestra 🔑
                </label>
                <input
                  type="password"
                  value={llaveMaestra}
                  onChange={(e) => setLlaveMaestra(e.target.value)}
                  placeholder="Ingresá tu llave maestra"
                  className="p-3 rounded-lg border border-violet-300 bg-violet-50/50 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  🔒 Pedimos tu llave maestra para confirmar que sos el titular de la cuenta y mantener la seguridad de las donaciones.
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 hover:from-blue-500 hover:to-violet-500 text-white font-semibold px-6 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Donar con Mercado Pago
              </button>

{/* HISTORIAS */}
<div className="mt-12 pt-8 border-t border-violet-200">
  {/* TÍTULO + ICONO */}
  <div className="flex items-center gap-3 mb-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-7 h-7 text-violet-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
      />
    </svg>

    <h2 className="text-2xl font-bold text-violet-700">
      Historias y actualizaciones
    </h2>
  </div>

  {/* DESCRIPCIÓN */}
  <p className="text-slate-600 mb-6">
    Enterate del progreso de la campaña: avances, compras realizadas,
    testimonios y otras novedades importantes que el creador compartió.
  </p>

  {/* LISTA */}
{histories.length === 0 ? (
  <p className="text-slate-600 italic">
    Aún no hay historias cargadas para esta campaña.
  </p>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    {histories.map((h) => (
      <Link
        key={h.id_historia}
        to={`/vermashist/${h.id_historia}`}
        className="block p-5 rounded-xl border border-violet-200 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200"
      >
        {/* MEDIA */}
        {h.archivo1 && (
          <>
            {isVideo(h.archivo1) ? (
              <video
                src={h.archivo1}
                controls
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
            ) : (
              <img
                src={h.archivo1}
                alt={h.titulo}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
            )}
          </>
        )}

        {/* TITULO */}
        <h3 className="text-lg font-semibold text-violet-700 mb-2">
          {h.titulo}
        </h3>

        {/* CONTENIDO → recortado a 3 líneas */}
        <p className="text-slate-700 whitespace-pre-wrap leading-relaxed line-clamp-3">
          {h.contenido}
        </p>

        {/* FECHA */}
        {h.fecha && (
          <p className="mt-4 text-xs text-slate-500">
            Publicado el {new Date(h.fecha).toLocaleDateString("es-AR")}
          </p>
        )}
      </Link>
    ))}
  </div>
)}

</div>




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
