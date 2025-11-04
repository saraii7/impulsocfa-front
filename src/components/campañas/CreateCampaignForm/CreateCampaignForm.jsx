import { useState, useEffect } from "react";
import { createCampaign } from "../../../services/campaign.service";
import { getCategories } from "../../../services/category.service";
import { useNavigate } from "react-router-dom";

export default function CreateCampaignForm() {
  const [formData, setFormData] = useState({
    id_categoria: "",
    titulo: "",
    descripcion: "",
    monto_objetivo: "",
    tiempo_objetivo: "",
    imagen: null,
  });

  const [categorias, setCategorias] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [errorCats, setErrorCats] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategories();
        setCategorias(data);
      } catch (err) {
        setErrorCats(err.message);
      } finally {
        setLoadingCats(false);
      }
    };
    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.titulo.trim()) newErrors.titulo = "El nombre es obligatorio.";
    if (!formData.descripcion.trim())
      newErrors.descripcion = "La descripción es obligatoria.";
    if (!formData.monto_objetivo || formData.monto_objetivo <= 0)
      newErrors.monto_objetivo = "El monto debe ser mayor que 0.";
    if (!formData.tiempo_objetivo)
      newErrors.tiempo_objetivo = "Debe ingresar una fecha de finalización.";
    return newErrors;
    if (!formData.id_categoria)
      newErrors.id_categoria = "Debe seleccionar una categoría.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage({ type: "error", text: "Por favor, corrige los campos en rojo." });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await createCampaign(formData);
      setMessage({ type: "success", text: "✅ Campaña creada con éxito!" });
      setTimeout(() => navigate("/campanas"), 1500);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "❌ Error al crear la campaña: " + error.message });
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50 px-6 py-10 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e9d5ff_1px,transparent_1px),linear-gradient(to_bottom,#e9d5ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200/40 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-violet-200 flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
          Crear Campaña
        </h2>

        {/* Mensaje global */}
        {message.text && (
          <div
            className={`p-3 rounded-lg text-center font-semibold transition-all duration-300 ${message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
              }`}
          >
            {message.text}
          </div>
        )}
        {/* 🟣 NUEVO: Selector de categoría */}
        <div>
          <label className="block text-slate-700 font-semibold mb-2">Categoría</label>
          {loadingCats ? (
            <p className="text-violet-600 animate-pulse">Cargando categorías...</p>
          ) : errorCats ? (
            <p className="text-red-600">Error al cargar categorías: {errorCats}</p>
          ) : (
            <select
              name="id_categoria"
              value={formData.id_categoria}
              onChange={handleChange}
              className={`w-full bg-violet-50/50 border ${errors.id_categoria ? "border-red-400" : "border-violet-300"
                } rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 ${errors.id_categoria
                  ? "focus:ring-red-400"
                  : "focus:ring-violet-400"
                } focus:border-transparent transition-all duration-300 hover:border-violet-400`}
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id_categoria} value={cat.id_categoria}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          )}
          {errors.id_categoria && (
            <p className="text-red-500 text-sm mt-1">{errors.id_categoria}</p>
          )}
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-slate-700 font-semibold mb-2">Nombre</label>
          <input
            type="text"
            name="titulo"
            placeholder="Nombre de la campaña"
            onChange={handleChange}
            className={`w-full bg-violet-50/50 border ${errors.titulo ? "border-red-400" : "border-violet-300"
              } rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${errors.titulo ? "focus:ring-red-400" : "focus:ring-violet-400"
              } focus:border-transparent transition-all duration-300 hover:border-violet-400`}
          />
          {errors.titulo && (
            <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-slate-700 font-semibold mb-2">
            Descripción
          </label>
          <textarea
            name="descripcion"
            placeholder="Describe tu campaña y su propósito"
            rows="4"
            onChange={handleChange}
            className={`w-full bg-violet-50/50 border ${errors.descripcion ? "border-red-400" : "border-violet-300"
              } rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${errors.descripcion ? "focus:ring-red-400" : "focus:ring-violet-400"
              } focus:border-transparent transition-all duration-300 hover:border-violet-400 resize-none`}
          />
          {errors.descripcion && (
            <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>
          )}
        </div>

        {/* Monto objetivo */}
        <div>
          <label className="block text-slate-700 font-semibold mb-2">
            Monto objetivo
          </label>
          <input
            type="number"
            name="monto_objetivo"
            placeholder="Monto en pesos"
            onChange={handleChange}
            className={`w-full bg-violet-50/50 border ${errors.monto_objetivo ? "border-red-400" : "border-violet-300"
              } rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${errors.monto_objetivo ? "focus:ring-red-400" : "focus:ring-violet-400"
              } focus:border-transparent transition-all duration-300 hover:border-violet-400`}
          />
          {errors.monto_objetivo && (
            <p className="text-red-500 text-sm mt-1">{errors.monto_objetivo}</p>
          )}
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-slate-700 font-semibold mb-2">
            Fecha de finalización
          </label>
          <input
            type="date"
            name="tiempo_objetivo"
            min={today} // 🟣 lógica existente: mantiene la validación de fecha mínima
            onChange={handleChange}
            className={`w-full bg-violet-50/50 border ${errors.tiempo_objetivo ? "border-red-400" : "border-violet-300"
              } rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 ${errors.tiempo_objetivo
                ? "focus:ring-red-400"
                : "focus:ring-violet-400"
              } focus:border-transparent transition-all duration-300 hover:border-violet-400 [color-scheme:light]`}
          />
          {errors.tiempo_objetivo && (
            <p className="text-red-500 text-sm mt-1">{errors.tiempo_objetivo}</p>
          )}
        </div>

        {/* Imagen de la campaña */}
        <div>
          <label className="block text-slate-700 font-semibold mb-2">
            Imagen de la campaña
          </label>

          <div className="flex flex-col items-center justify-center gap-3 bg-violet-50/50 border-2 border-dashed border-violet-300 rounded-xl p-6 text-center hover:border-violet-400 transition-all duration-300">
            <div className="flex flex-col items-center text-violet-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 mb-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <p className="text-sm font-medium text-slate-600">
                Subí hasta 3 imágenes
              </p>
            </div>

            {/* Botón estilizado */}
            <label className="cursor-pointer mt-2 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              Seleccionar imágenes
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files).slice(0, 3); // máximo 3
                  setFormData({
                    ...formData,
                    foto1: files[0] || null,
                    foto2: files[1] || null,
                    foto3: files[2] || null,
                  });
                }}
                className="hidden"
              />
            </label>
            {formData.foto1 || formData.foto2 || formData.foto3 ? (
              <div className="flex flex-wrap gap-2 mt-3">
                {[formData.foto1, formData.foto2, formData.foto3]
                  .filter(Boolean)
                  .map((file, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(file)}
                      alt={`preview-${idx}`}
                      className="w-24 h-24 object-cover rounded-lg border border-violet-300"
                    />
                  ))}
              </div>
            ) : null}

          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-violet-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? "Creando..." : "Crear Campaña"}
        </button>
      </form>
    </div>
  );
}
