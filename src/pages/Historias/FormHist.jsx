import { useState, useEffect } from "react";
import { createHistory } from "../../services/history.service";
import { getAllCampaigns } from "../../services/campaing.service";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Upload, FileText, BookOpen, Camera } from "lucide-react";

export default function FormHist({ campañas = [], onSuccess }) {
  const [form, setForm] = useState({
    titulo: "",
    contenido: "",
    id_campana: "",
  });

  const [files, setFiles] = useState({
    archivo1: null,
    archivo2: null,
    archivo3: null,
  });

  const [loading, setLoading] = useState(false);

  // campañas finalizadas filtradas por fecha
  const [campañasUsuario, setCampañasUsuario] = useState([]);

useEffect(() => {
  async function cargarCampañasUsuario() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const todas = await getAllCampaigns();

      const propias = todas.filter(
        (c) => c.id_usuario === user.id_usuario
      );

      setCampañasUsuario(propias);
    } catch (err) {
      console.log(err);
    }
  }

  cargarCampañasUsuario();
}, []);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);



    try {
      const result = await createHistory({ ...form, ...files });

      toast.success("Historia creada con éxito 🎉");

      if (onSuccess) onSuccess(result);

      setForm({ titulo: "", contenido: "", id_campana: "" });
      setFiles({ archivo1: null, archivo2: null, archivo3: null });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-purple-50 py-12 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-violet-200/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-200/30 to-transparent rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        {/* Header Section */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-3"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Crear Historia
            </h1>
          </motion.div>
          <p className="text-slate-600 text-lg">Comparte tu historia de impacto con la comunidad de Impulso CFA :)</p>
        </div>

        {/* Main Form Card */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-violet-200/50 border border-violet-200 p-8 space-y-6"
        >
          {/* Título */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="space-y-3"
          >
            <label className="flex items-center gap-2 font-bold text-slate-800 text-lg">
              <FileText className="w-5 h-5 text-violet-600" />
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              placeholder="Ej: Cómo reconstruimos nuestro hogar"
              className="w-full px-4 py-3 bg-white/60 border-2 border-violet-200 rounded-2xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-300/50 transition-all placeholder:text-slate-400 text-slate-800"
              required
            />
          </motion.div>

          {/* Contenido */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="space-y-3"
          >
            <label className="flex items-center gap-2 font-bold text-slate-800 text-lg">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Contenido <span className="text-red-500">*</span>
            </label>
            <textarea
              name="contenido"
              value={form.contenido}
              onChange={handleChange}
              placeholder="Cuéntanos tu historia..."
              className="w-full px-4 py-3 bg-white/60 border-2 border-violet-200 rounded-2xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-300/50 transition-all placeholder:text-slate-400 text-slate-800 min-h-[160px] resize-none"
              required
            />
          </motion.div>

          {/* Seleccionar campaña */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="space-y-3"
          >
            <label className="flex items-center gap-2 font-bold text-slate-800 text-lg">
              <span className="w-5 h-5 flex items-center justify-center text-violet-600">🎯</span>
              Campaña <span className="text-red-500">*</span>
            </label>

            {/* 🔥 SOLO CAMPAÑAS FINALIZADAS */}
            <select
              name="id_campana"
              value={form.id_campana}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/60 border-2 border-violet-200 rounded-2xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-300/50 transition-all text-slate-800 font-medium"
              required
            >
              <option value="">Seleccionar campaña...</option>
              {campañasUsuario.map((c) => (
                <option key={c.id_campana} value={c.id_campana}>
                  {c.titulo}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Archivos opcionales */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="space-y-4 bg-gradient-to-r from-violet-50 to-blue-50 rounded-2xl p-6 border border-violet-200"
          >
            <label className="flex items-center gap-2 font-bold text-slate-800 text-lg">
              <Camera className="w-5 h-5 text-indigo-600" />
              Archivos Multimedia <span className="text-slate-500 text-sm font-normal">(Obligatorio 1 foto)</span>
            </label>
            <p className="text-sm text-slate-600">Sube hasta 3 imágenes o videos</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((num) => {
                const fileName = `archivo${num}`;
                return (
                  <motion.div key={num} whileHover={{ y: -4 }} className="relative group">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-violet-300 rounded-xl cursor-pointer hover:bg-white/40 transition-all group relative overflow-hidden">
                      <div className="flex flex-col items-center justify-center pt-6 pb-6">
                        <Upload className="w-6 h-6 text-violet-600 mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-sm text-slate-600 text-center">
                          {files[fileName] ? `${files[fileName].name.slice(0, 20)}...` : `Archivo ${num}`}
                        </p>
                      </div>
                      <input
                        type="file"
                        name={fileName}
                        onChange={handleFileChange}
                        accept="image/*,video/*"
                        className="hidden"
                      />
                    </label>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="pt-4"
          >
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-violet-300/50 hover:shadow-violet-300/70 flex items-center justify-center gap-2 text-lg"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Subiendo tu historia...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Publicar Historia
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-violet-200 text-center"
        >
          <p className="text-slate-600 text-sm">
            Tu historia inspirará a otros. Comparte tu vivencia con autenticidad y empatía
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
