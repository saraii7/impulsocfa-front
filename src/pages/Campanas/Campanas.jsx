import CardCampana from "../../components/CardCampana"
import { getAllCampaigns } from "../../services/campaing.service";
import { useEffect, useState } from "react";

export default function Campanas() {
  const [campanas, setCampanas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    const fetchCampanas = async () => {
      try {
        const data = await getAllCampaigns();
        setCampanas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampanas();
  }, []);

  if (loading) return <p>Cargando campañas...</p>;
  if (error) return <p>Error: {error}</p>;
  if (campanas.length === 0) return <p>No hay campañas disponibles.</p>;


  return (
    <div>
     <div >
      {campanas.map((c) => (
        <CardCampana key={c.id_campana} campana={c} />
      ))}
    </div>
  </div>


  );
}