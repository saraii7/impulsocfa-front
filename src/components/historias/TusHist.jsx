import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllHistories } from "../../services/history.service";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Plus } from 'lucide-react';
import toast from "react-hot-toast";

export default function TusHist() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isVideo = (url) => {
    if (!url) return false;
    return url.endsWith(".mp4") || url.endsWith(".mov") || url.endsWith(".webm");
  };


  // Obtener userId del token
  const token = localStorage.getItem("access_token");
  let userId = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Payload del token:", payload);
      userId = payload.id || payload.sub || payload.userId;
    } catch (err) {
      console.error("Error leyendo token:", err);
      toast.error("Error leyendo token del usuario");
    }
  }

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const allStories = await getAllHistories();
        const userStories = allStories.filter(story => story.id_usuario === userId);
        setStories(userStories);
      } catch (err) {
        console.error("Error cargando tus historias:", err);
        toast.error("No se pudieron cargar tus historias");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchStories();
    else setLoading(false);
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-blue-50 to-purple-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-8 h-8 border-3 border-violet-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!stories.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-purple-50 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <BookOpen className="w-16 h-16 text-violet-400 mx-auto mb-4" />
          <p className="text-xl text-slate-600 mb-6">No tienes historias publicadas aún.</p>
          <Link
            to="/formhist"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Crear tu primera historia
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-purple-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
<div className="mb-10 flex items-center justify-between gap-4">
  {/* Título + subtítulo */}
  <div>
    <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-2">
      Tus historias
    </h1>
    <p className="text-slate-600 text-lg">
      {stories.length} historia{stories.length !== 1 ? "s" : ""} publicada
      {stories.length !== 1 ? "s" : ""}
    </p>
  </div>

  {/* Botón a la derecha */}
  <Link to="/formhist">
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(167, 139, 250, 0.6)" }}
      whileTap={{ scale: 0.95 }}
      className="group relative px-8 py-4 bg-gradient-to-r from-violet-400 to-blue-400 rounded-2xl text-lg font-bold text-white shadow-2xl shadow-violet-300/50 overflow-hidden flex items-center gap-3"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400"
        initial={{ x: "100%" }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10 flex items-center gap-2">
        Subí tu historia
        <ArrowRight className="w-5 h-5" />
      </span>
    </motion.button>
  </Link>
</div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={story.id_historia}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-violet-200/50 border border-violet-200 hover:shadow-2xl hover:shadow-violet-300/50 transition-all cursor-pointer h-full flex flex-col justify-between"
              onClick={() => navigate(`/vermashist/${story.id_historia}`)}
            >
              <div className="flex-1">
                {/* Mostrar imagen o video según el archivo */}
                {story.archivo1 ? (
                  isVideo(story.archivo1) ? (
                    <video
                      src={story.archivo1}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      muted
                      autoPlay
                      loop
                    />
                  ) : (
                    <img
                      src={story.archivo1}
                      alt={story.titulo}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )
                ) : (
                  <img
                    src="https://via.placeholder.com/400x300?text=Sin+archivo"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                <h2 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">
                  {story.titulo}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {story.contenido}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-violet-200 flex justify-end">
                <motion.button
                  whileHover={{ gap: 8 }}
                  className="text-violet-600 hover:text-violet-700 font-semibold flex items-center gap-2 transition-colors"
                >
                  Ver más
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
          
        </div>
      </motion.div>
      
    </div>
    
  );
}