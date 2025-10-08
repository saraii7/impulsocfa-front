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
     <div>
        <button
        onClick={() => navigate("/campanas")} >
        ← Volver a campañas
      </button>

    <h1 >{campana.titulo}</h1>
    <p>{campana.descripcion}</p>
    <p>Estado: {campana.campana_estado}</p>
    <p>Monto objetivo: ${campana.monto_objetivo}</p>
    <p>Monto actual: ${campana.monto_actual}</p>
    <p>Tiempo objetivo: {campana.tiempo_objetivo} días</p>
    <p>Fecha inicio: {campana.fecha_inicio}</p>
  </div>
  );
}