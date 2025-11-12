import { Link } from "react-router-dom";
import { useState } from "react";

export default function CardCampana({ campana }) {
  const imagenes = [campana.foto1, campana.foto2, campana.foto3].filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotar imágenes automáticamente al pasar el mouse
  const handleMouseEnter = () => {
    if (imagenes.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % imagenes.length);
      }, 2000);
      setIntervalId(interval);
    }
  };

  const [intervalId, setIntervalId] = useState(null);

  const handleMouseLeave = () => {
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
    setCurrentIndex(0);
  };

  const imagen =
    imagenes[currentIndex] ||
    "https://via.placeholder.com/400x300?text=Sin+imagen";

  return (
    <div
      className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl shadow-lg border border-violet-200 p-6 flex flex-col hover:shadow-xl hover:scale-105 transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden border border-violet-200">
        <img
          src={imagen}
          alt={campana.titulo}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />
        {imagenes.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {imagenes.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === currentIndex ? "bg-violet-600" : "bg-violet-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

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
