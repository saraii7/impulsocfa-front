import { Link } from "react-router-dom";


export default function CardCampana({ campana }) {
    return (
     <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 shadow-[0_0_30px_rgba(139,92,246,0.2)] border border-violet-500/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:scale-105 transition-all duration-300">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-3">
                {campana.titulo}
            </h2>
            <p className="text-slate-300 mb-4 line-clamp-3">
                {campana.descripcion}
            </p>
            <Link
                to={`/campanas/${campana.id_campana}`}
                className="inline-block text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-300 hover:underline"
            >
                Ver más →
            </Link>
        </div>
  );
}