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
        console.log("Campañas obtenidas:", data);
        setCampanas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampanas();
  }, []);

   if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-violet-950">
        <p className="text-violet-400 text-lg font-semibold animate-pulse">
          Cargando campañas...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-violet-950">
        <p className="text-red-400 font-medium">Error: {error}</p>
      </div>
    );

  if (campanas.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-violet-950">
        <p className="text-slate-400 text-lg">
          No hay campañas disponibles por el momento.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-violet-950 py-16 px-6 text-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Campañas Activas
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Explorá las campañas solidarias en curso y descubrí cómo podés
          aportar para generar un impacto real.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {campanas.map((c) => (
          <CardCampana key={c.id_campana} campana={c} />
        ))}
      </div>
    </div>
  );
}