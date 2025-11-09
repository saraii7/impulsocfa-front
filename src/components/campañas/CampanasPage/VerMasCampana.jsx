import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCampaignById } from "../../../services/campaign.service";
import Comments from "../../../components/comentarios/Comments";
import TodasDonaciones from "../../../pages/UsuarioPanel/TodasDonaciones"; // el componente que ya hiciste
import { ArrowLeft, Calendar, Target, Clock, TrendingUp } from "lucide-react";

export default function VerMasCampana() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campana, setCampana] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampana = async () => {
      try {
        const data = await getCampaignById(id);
        setCampana(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCampana();
  }, [id]);

  if (loading) return <p className="text-center mt-6">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50 p-8">
      <button
        onClick={() => navigate("/campanas")}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white border border-violet-200 rounded-lg text-violet-600 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver a mis campañas
      </button>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-violet-200 p-6">
        <h1 className="text-3xl font-bold text-violet-700 mb-4">{campana.titulo}</h1>
        <p className="text-gray-700 mb-6">{campana.descripcion}</p>

        {/* Datos clave */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center gap-2 bg-violet-50 border border-violet-200 p-3 rounded-xl">
            <Target className="text-violet-600" />
            <span className="font-semibold">Meta: ${campana.monto_objetivo}</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 p-3 rounded-xl">
            <TrendingUp className="text-blue-600" />
            <span className="font-semibold">Recaudado: ${campana.monto_actual}</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 p-3 rounded-xl">
            <Clock className="text-purple-600" />
            <span className="font-semibold">{campana.tiempo_objetivo} días</span>
          </div>
          <div className="flex items-center gap-2 bg-pink-50 border border-pink-200 p-3 rounded-xl">
            <Calendar className="text-pink-600" />
            <span className="font-semibold">
              {new Date(campana.fecha_inicio).toLocaleDateString("es-ES")}
            </span>
          </div>
        </div>

        {/* Sección de donaciones */}
        <h2 className="text-2xl font-semibold text-violet-700 mb-4">Donaciones recibidas</h2>
        <TodasDonaciones id_campana={id} />

        {/* Sección de comentarios */}
        <h2 className="text-2xl font-semibold text-violet-700 mt-8 mb-4">Comentarios</h2>
        <Comments id_campana={id} />
      </div>
    </div>
  );
}
