import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { getCampaignById } from "../../services/campaing.service";

export default function DetalleCampana() {
    const { id } = useParams(); // viene de la ruta /campanas/:id
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

    if (loading) return <p>Cargando campaña...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!campana) return <p>No se encontró la campaña.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-xl">

        <button
        onClick={() => navigate("/campanas")}
        className="mb-4 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
      >
        </button>

      <h1 className="text-2xl font-bold">{campana.titulo}</h1>
      <p className="mt-2 text-gray-700">{campana.descripcion}</p>
      <p className="mt-4 text-sm text-gray-500">Estado: {campana.campana_estado}</p>
      <p className="mt-2 text-sm text-gray-500">Monto objetivo: ${campana.monto_objetivo}</p>
      <p className="mt-2 text-sm text-gray-500">Monto actual: ${campana.monto_actual}</p>
      <p className="mt-2 text-sm text-gray-500">Tiempo objetivo: {campana.tiempo_objetivo} días</p>
      <p className="mt-2 text-sm text-gray-500">Fecha inicio: {campana.fecha_inicio}</p>
      
    </div>
  );
}