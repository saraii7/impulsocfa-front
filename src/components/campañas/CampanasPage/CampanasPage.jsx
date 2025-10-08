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
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 relative overflow-hidden">
            {/* Patrón de fondo */}
           
            
            {/* Esferas de luz animadas */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                        Mis Campañas
                    </h1>
                    <button
                        onClick={() => navigate("/crearcampana")}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 hover:from-blue-500 hover:via-violet-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:scale-105 border border-violet-400/30"
                    >
                        Crear Campaña
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-slate-300 text-lg">Cargando campañas...</p>
                    </div>
                ) : campaigns.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-slate-300 text-lg">No tienes campañas creadas.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {campaigns.map((c) => (
                            <div 
                                key={c.id_campana} 
                                className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.2)] border border-violet-500/30 p-6 flex flex-col hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-all duration-300 hover:scale-105"
                            >
                                {c.foto_principal && (
                                    <img
                                        src={c.foto_principal}
                                        alt={c.titulo}
                                        className="rounded-lg mb-4 object-cover h-48 w-full border border-violet-500/20"
                                    />
                                )}
                                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                                    {c.titulo}
                                </h3>
                                <p className="text-slate-300 mb-3 line-clamp-2">{c.descripcion}</p>
                                <p className="text-slate-400 text-sm mb-4">
                                    <span className="text-violet-400 font-semibold">Meta:</span> ${c.monto_objetivo} | 
                                    <span className="text-violet-400 font-semibold"> Duración:</span> {c.tiempo_objetivo} días
                                </p>
                                <div className="flex gap-3 mt-auto">
                                    <button
                                        onClick={() => handleEdit(c.id_campana)}
                                        className="flex-1 px-4 py-2 bg-blue-600/80 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 border border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(c.id_campana)}
                                        className="flex-1 px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-300 border border-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
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