import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { createReporte } from "../services/report.service";
import { motion } from "framer-motion";
import { AlertCircle, Send, ChevronLeft } from "lucide-react";

export default function ReportCampana() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [motivo, setMotivo] = useState("");
  const [loading, setLoading] = useState(false);

  const charCount = motivo.trim().length;
  const isValid = charCount >= 10;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      toast.error("Escribí un motivo más detallado.");
      return;
    }

    setLoading(true);
    try {
      await createReporte({ id_campana: id, motivo });
      toast.success("Reporte enviado correctamente");
      navigate(`/campanas/${id}`); // <-- cambia según tu ruta real
    } catch (err) {
      toast.error(err.message || "No se pudo enviar el reporte");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 py-12 px-4 relative overflow-hidden">
      {/* Background Animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-red-200/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-orange-200/30 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Form Container */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto relative z-10">
        <motion.button
          onClick={() => navigate(`/campanas/${id}`)}
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Volver
        </motion.button>

        {/* Header */}
        <div className="mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <h1 className="text-4xl font-bold text-red-700">Reportar campaña</h1>
          </motion.div>
          <p className="text-slate-600 text-lg">
            Comparte los detalles sobre por qué consideras que esta campaña debe ser revisada
          </p>
        </div>

        {/* Alert Box */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-red-50/80 backdrop-blur-sm border-2 border-red-200 rounded-2xl p-4 mb-8">
          <p className="text-sm text-red-700 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>Los reportes falsos o inapropiados pueden resultar en restricciones a tu cuenta</span>
          </p>
        </motion.div>

        {/* Form */}
        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-red-200/50 border border-red-200 p-8 space-y-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.4 }} className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-lg">
                Motivo del reporte <span className="text-red-600">*</span>
              </span>
              <span className={`text-sm font-medium ${isValid ? "text-green-600" : "text-slate-500"}`}>
                {charCount}/10
              </span>
            </label>
            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Describí detalladamente la razón por la que reportas esta campaña..."
              className="w-full px-4 py-3 bg-white/60 border-2 border-red-200 rounded-2xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300/50 transition-all placeholder:text-slate-400 text-slate-800 min-h-[180px] resize-none"
            />
            <p className="text-xs text-slate-500">Mínimo 10 caracteres. Sé específico y claro sobre el problema.</p>
          </motion.div>

          {/* Buttons */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }} className="pt-4 flex gap-3">
            <motion.button type="button" onClick={() => navigate(`/campanas/${id}`)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 px-6 rounded-2xl transition-all">
              Cancelar
            </motion.button>
            <motion.button type="submit" disabled={!isValid || loading} whileHover={isValid ? { scale: 1.02 } : {}} whileTap={isValid ? { scale: 0.98 } : {}} className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-lg shadow-red-300/50 hover:shadow-red-300/70 flex items-center justify-center gap-2">
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar reporte
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="mt-6 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-red-200 text-center">
          <p className="text-slate-600 text-sm">Tu reporte será revisado por nuestro equipo en las próximas 24 horas</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
