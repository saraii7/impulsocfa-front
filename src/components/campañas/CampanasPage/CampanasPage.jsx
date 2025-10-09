import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getUserCampaigns, suspendCampaign } from "../../../services/campaign.service";

export default function CampanasPage() {
    const [user, setUser] = useState(null);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getCurrentUser();
                setUser(user);

                const campaigns = await getUserCampaigns(user.id);
                setCampaigns(campaigns);
            } catch (err) {
                console.error(err);
                alert(err.message);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que quieres suspender esta campaña?")) return;
        try {
            await suspendCampaign(id);
            alert("Campaña suspendida con éxito");
            setCampaigns(campaigns.filter((c) => c.id_campana !== id));
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const handleEdit = (id) => navigate(`/editarcampana/${id}`);

    return (
         <div className="min-h-screen bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50 p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e9d5ff_1px,transparent_1px),linear-gradient(to_bottom,#e9d5ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-30" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200/40 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            Mis Campañas
          </h1>
          <button
            onClick={() => navigate("/crearcampana")}
            className="px-6 py-3 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-violet-300"
          >
            Crear Campaña
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-700 text-lg">Cargando campañas...</p>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-700 text-lg">No tienes campañas creadas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((c) => (
              <div
                key={c.id_campana}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-violet-200 p-6 flex flex-col hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {c.foto_principal && (
                  <img
                    src={c.foto_principal || "/placeholder.svg"}
                    alt={c.titulo}
                    className="rounded-lg mb-4 object-cover h-48 w-full border border-violet-200"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  {c.titulo}
                </h3>
                <p className="text-slate-700 mb-3 line-clamp-2">{c.descripcion}</p>
                <p className="text-slate-600 text-sm mb-4">
                  <span className="text-violet-600 font-semibold">Meta:</span> ${c.monto_objetivo} |
                  <span className="text-violet-600 font-semibold"> Duración:</span> {c.tiempo_objetivo} días
                </p>
                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => handleEdit(c.id_campana)}
                    className="flex-1 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-300 border border-blue-300 hover:shadow-lg"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.id_campana)}
                    className="flex-1 px-4 py-2 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-lg transition-all duration-300 border border-red-300 hover:shadow-lg"
                  >
                    Suspender
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    );
}