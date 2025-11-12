import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLlaveMaestra } from "../../services/auth.service";

export default function MostrarLlaveMaestra() {
    const [llave, setLlave] = useState(null);
    const [error, setError] = useState(null);
    const [copiado, setCopiado] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLlave = async () => {
            try {
                const data = await getLlaveMaestra();
                setLlave(data.llave_maestra);
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        };
        fetchLlave();
    }, []);

    const handleIrDashboard = () => {
        navigate("/home");
    };

    const handleCopiar = () => {
        navigator.clipboard.writeText(llave);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-8 relative overflow-hidden">
            {/* Patrón de fondo */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />

            {/* Esferas de luz animadas */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative z-10 bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 max-w-lg w-full text-center shadow-[0_0_40px_rgba(139,92,246,0.3)] border border-violet-500/30">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent mb-4 drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                    🔑 Llave Maestra
                </h2>

                <p className="text-slate-300 mb-6 text-sm leading-relaxed">
                    Esta llave se muestra <strong className="text-violet-400">solo una vez</strong>.
                    Copiala ahora, porque será tu llave para ejecutar funciones dentro de la aplicación, como donar y recibir donaciones.
                </p>

                {error && (
                    <p className="text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                        ❌ {error}
                    </p>
                )}

                {llave ? (
                    <div>
                        <div className="bg-slate-800/50 border border-violet-500/30 rounded-lg p-4 mb-6">
                            <p className="text-violet-300 font-mono text-sm break-all">
                                {llave}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={handleCopiar}
                                className="px-6 py-3 bg-blue-600/80 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 border border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105"
                            >
                                {copiado ? "Copiado ✅" : "Copiar"}
                            </button>

                            <button
                                onClick={handleIrDashboard}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 hover:from-blue-500 hover:via-violet-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:scale-105 border border-violet-400/30"
                            >
                                Ir al inicio
                            </button>
                        </div>
                    </div>
                ) : (
                    !error && (
                        <p className="text-slate-400 text-lg">⏳ Cargando...</p>
                    )
                )}
            </div>
        </div>
    );
}
