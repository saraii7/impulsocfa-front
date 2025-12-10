import { useState, useEffect } from "react";
import { createCampaign } from "../../../services/campaign.service";
import { getCategories } from "../../../services/category.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function CreateCampaignForm() {
  const [formData, setFormData] = useState({
    id_categoria: "",
    alias: "",
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
  const [llaveMaestra, setLlaveMaestra] = useState("");
  const [showRules, setShowRules] = useState(false)
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

    if (!formData.titulo.trim())
      newErrors.titulo = "El nombre es obligatorio.";

    if (!formData.alias.trim())
      newErrors.alias = "El alias es obligatorio.";

    if (!formData.descripcion.trim())
      newErrors.descripcion = "La descripción es obligatoria.";

    if (!formData.monto_objetivo || formData.monto_objetivo <= 0)
      newErrors.monto_objetivo = "El monto debe ser mayor que 0.";

    if (!formData.tiempo_objetivo)
      newErrors.tiempo_objetivo = "Debe ingresar una fecha de finalización.";

    if (!formData.id_categoria)
      newErrors.id_categoria = "Debe seleccionar una categoría.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Por favor, corrige los campos en rojo.");
      return;
    }
    if (!llaveMaestra.trim()) {
      toast.error("Ingresá tu llave maestra para continuar.");
      return;
    }

    setLoading(true);


    try {
      const numericMonto = parseFloat(
        formData.monto_objetivo.replace(/\./g, "").replace(",", ".")
      );
      await createCampaign({
        ...formData,
        monto_objetivo: numericMonto,
        llave_maestra: llaveMaestra,
      });
      toast.success("✅ Campaña creada con éxito!");
      setTimeout(() => navigate("/campanas"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("❌ Error al crear la campaña: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleMontoChange = (e) => {
    let value = e.target.value;

    // Permitir solo números, puntos y comas
    value = value.replace(/[^\d.,]/g, "");

    // Reemplazar todas las comas por puntos para convertir a número real
    const numericValue = parseFloat(value.replace(",", ".").replace(/\./g, (match, offset) => {
      // evita eliminar el punto decimal si está al final
      return offset < value.length - 3 ? "" : ".";
    }));

    // Formatear con puntos para miles (sin afectar coma decimal)
    const parts = value.split(",");
    let integerPart = parts[0].replace(/\D/g, "");
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const formattedValue = parts[1] ? `${integerPart},${parts[1]}` : integerPart;

    setFormData((prev) => ({ ...prev, monto_objetivo: formattedValue }));
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

        <button
          onClick={() => setShowRules(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl 
               bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500
               text-white font-semibold
               shadow-md hover:shadow-lg
               transition-all duration-300
               border border-amber-300/50"
        >
          <span className="text-lg">⚠️</span>
          <span>Reglas importantes</span>
        </button>

        {/* Llave maestra */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Llave maestra 🔑
          </label>
          <p className="text-xs text-slate-500 mb-2">
            Pedimos tu llave maestra para verificar que sos el titular de la cuenta y
            mantener la seguridad de la plataforma.
          </p>
          <input
            type="password"
            name="llave_maestra"
            placeholder="Ingresá tu llave maestra"
            value={llaveMaestra}
            onChange={(e) => setLlaveMaestra(e.target.value)}
            className="w-full bg-violet-50/50 border border-violet-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 hover:border-violet-400"
            required
          />
        </div>



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

        {/* Alias */}
        <div>
          <label className="block text-slate-700 font-semibold mb-2">
            Alias
          </label>
          <input
            type="text"
            name="alias"
            placeholder="Ej: ayuda-bahia"
            value={formData.alias}
            onChange={handleChange}
            className={`w-full bg-violet-50/50 border ${errors.alias ? "border-red-400" : "border-violet-300"
              } rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${errors.alias ? "focus:ring-red-400" : "focus:ring-violet-400"
              } focus:border-transparent transition-all duration-300 hover:border-violet-400`}
          />
          {errors.alias && (
            <p className="text-red-500 text-sm mt-1">{errors.alias}</p>
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
            type="text"
            name="monto_objetivo"
            value={formData.monto_objetivo}
            onChange={handleMontoChange}
            placeholder="Monto en pesos"
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
      {showRules && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative animate-[fadeIn_0.3s_ease]">
            {/* Cerrar */}
            <button
              onClick={() => setShowRules(false)}
              className="absolute right-4 top-4 text-slate-500 hover:text-slate-700 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
              Reglas importantes para crear campañas
            </h2>

            <div className="space-y-4 text-slate-700">
              <p>
                Para mantener{" "}
                <span className="font-semibold text-violet-600">seguridad, transparencia y confianza</span> en nuestra
                comunidad, todas las campañas deben cumplir estas reglas:
              </p>

              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold">Chequeá con frecuencia tu campaña.</span> para estar al tanto de como va tu progreso.
                </li>

                <li>
                  <span className="font-semibold text-violet-700">Al llegar al 50% del objetivo</span>, es obligatorio
                  subir una
                  <span className="font-semibold"> historia o actualización</span> con evidencia: fotos, videos,
                  comprobantes o cualquier material que demuestre el avance y la veracidad, <span className="font-semibold text-violet-700">Al llegar al 100% del objetivo aplica lo mismo</span>.
                </li>

                <li>Mantener fotos actualizadas y datos claros es clave para que los donantes confíen en vos.</li>

                <li className="text-red-600 font-semibold">
                  Si pasan 48 horas desde que alcanzaste el 50% y no subiste una historia, la campaña será suspendida
                  automáticamente.
                </li>

                <li className="text-red-600 font-semibold">
                  Si la falta de actualización persiste,{" "}
                  <span className="underline">tu cuenta también podrá ser suspendida.</span>
                </li>
                <li className="text-red-600 font-semibold">
                  Si la falta de actualización persiste una vez finalizada tu campaña,{" "}
                  <span className="underline">tu cuenta también podrá ser suspendida.</span>
                </li>
              </ul>

              <p>Queremos que cada campaña sea confiable y segura. Estas reglas nos ayudan a proteger a todos 🤝</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowRules(false)}
                className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg shadow transition"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
