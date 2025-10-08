import { useState } from "react";
import { createCampaign } from "../../../services/campaign.service";

export default function CreateCampaignForm() {
    const [formData, setFormData] = useState({
        id_categoria: 26,    
        titulo: "",
        descripcion: "",
        monto_objetivo: "",
        tiempo_objetivo: "",
        imagen: null,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createCampaign(formData);
            alert("✅ Campaña creada con éxito!");
        } catch (error) {
            console.error(error);
            alert("❌ Error al crear la campaña: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fecha mínima (hoy) para no permitir fechas anteriores
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-8 relative overflow-hidden">
            {/* Patrón de fondo */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />
            
            {/* Esferas de luz animadas */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

            <form
                onSubmit={handleSubmit}
                className="relative z-10 max-w-lg w-full bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.3)] border border-violet-500/30 flex flex-col gap-5"
            >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent text-center mb-4 drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                    Crear Campaña
                </h2>

                <div>
                    <label className="block text-slate-300 font-semibold mb-2">Nombre</label>
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Nombre de la campaña"
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800/50 border border-violet-500/30 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:border-violet-500/50"
                    />
                </div>

                <div>
                    <label className="block text-slate-300 font-semibold mb-2">Descripción</label>
                    <textarea
                        name="descripcion"
                        placeholder="Descripción de la campaña"
                        rows="4"
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800/50 border border-violet-500/30 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:border-violet-500/50 resize-none"
                    />
                </div>

                <div>
                    <label className="block text-slate-300 font-semibold mb-2">Monto objetivo</label>
                    <input
                        type="number"
                        name="monto_objetivo"
                        placeholder="Monto objetivo"
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800/50 border border-violet-500/30 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:border-violet-500/50"
                    />
                </div>

                <div>
                    <label className="block text-slate-300 font-semibold mb-2">Fecha de finalización</label>
                    <input
                        type="date"
                        name="tiempo_objetivo"
                        min={today}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800/50 border border-violet-500/30 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:border-violet-500/50 [color-scheme:dark]"
                    />
                </div>

                <div>
                    <label className="block text-slate-300 font-semibold mb-2">Imagen de la campaña</label>
                    <input
                        type="file"
                        name="imagen"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full bg-slate-800/50 border border-violet-500/30 rounded-lg px-4 py-3 text-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-violet-600 file:text-white file:font-semibold hover:file:bg-violet-500 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:border-violet-500/50"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 hover:from-blue-500 hover:via-violet-500 hover:to-pink-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:scale-105 border border-violet-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {loading ? "Creando..." : "Crear Campaña"}
                </button>
            </form>
        </div>
    );
}