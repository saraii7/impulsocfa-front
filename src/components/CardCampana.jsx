import { Link } from "react-router-dom";


export default function CardCampana({ campana }) {
    return (
        <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{campana.titulo}</h2>
      <p className="text-gray-600">{campana.descripcion}</p>
      <Link
        to={`/campanas/${campana.id_campana}`}
        className="text-violet-600 mt-2 inline-block"
      >
        Ver más
      </Link>
    </div>
  );
}