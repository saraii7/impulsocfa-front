import { Link } from "react-router-dom";


export default function CardCampana({ campana }) {
  return (
    <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl shadow-lg border border-violet-200 p-6 flex flex-col hover:shadow-xl hover:scale-105 transition-all duration-300">
      {/* Imagen real o placeholder */}
      <img
        src={campana.foto_principal || "https://via.placeholder.com/400x300?text=Sin+imagen"}
        alt={campana.titulo}
        className="rounded-lg mb-4 object-cover h-48 w-full border border-violet-200"
      />

      <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
        {campana.titulo}
      </h2>
      <p className="text-slate-700 mb-4 line-clamp-3">{campana.descripcion}</p>
      <Link
        to={`/campanas/${campana.id_campana}`}
        className="inline-block text-violet-600 hover:text-violet-700 font-semibold transition-colors duration-300 hover:underline"
      >
        Ver más →
      </Link>
    </div>
  );
}