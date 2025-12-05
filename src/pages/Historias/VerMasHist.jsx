import { motion, useInView } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Heart, Eye, ArrowLeft, MessageCircle, Trash2, Edit } from "lucide-react";
import { getHistoryById, deleteHistory } from "../../services/history.service";
import { getUserById } from "../../services/user.service";
import { getCampaignById } from "../../services/campaing.service";
import toast from "react-hot-toast";
import Comments from "../../components/comentarios/Comments";


export default function VerMasHist() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isContentInView = useInView(contentRef, { once: true });
  const [selectedImage, setSelectedImage] = useState(null);
  const isVideo = (url) => {
    return url.endsWith(".mp4") || url.endsWith(".mov") || url.endsWith(".webm");
  };


  // Obtener userId del token para validar si puede editar/eliminar
  const token = localStorage.getItem("access_token");
  let userId = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.id || payload.sub || payload.userId;
    } catch (err) {
      console.error("Error leyendo token:", err);
      toast.error("Error leyendo token del usuario");
    }
  }

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const data = await getHistoryById(id);

        setStory({
          id_historia: data.id_historia,
          id_usuario: data.id_usuario,

          // Datos del usuario (devueltos por supabase como "usuario")
          author: data.usuario?.nombre || "Usuario",
          authorBio: data.usuario?.descripcion || "Participante de la campaña",
          authorImage: data.usuario?.nombre?.charAt(0).toUpperCase() || "U",

          // Datos de la campaña asociada (devueltos como "campana")
          id_campana: data.campana?.id_campana,
          category: data.campana?.titulo || "Historia",

          // Contenido
          title: data.titulo,
          fullContent: data.contenido,
          image: [data.archivo1,
          data.archivo2,
          data.archivo3].filter(Boolean),

          // Fecha
          date: new Date(data.fecha_creacion).toLocaleDateString("es-AR"),

          // Datos mock
          views: Math.floor(Math.random() * 4000) + 1000,
          likes: Math.floor(Math.random() * 500) + 50,
        });

      } catch (err) {
        console.error("Error cargando historia:", err);
        toast.error("No se pudo cargar la historia");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);


  const handleDelete = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span>¿Estás seguro de eliminar esta historia?</span>
          <div className="flex justify-end gap-2 mt-2">
            <button
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancelar
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={async () => {
                toast.dismiss(t.id); // Cierra el toast
                try {
                  await deleteHistory(story.id_historia);
                  toast.success("Historia eliminada");
                  navigate("/tushist");
                } catch (err) {
                  console.error("Error eliminando historia:", err);
                  toast.error("No se pudo eliminar la historia");
                }
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ),
      { duration: Infinity } // dura hasta que se haga click
    );
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando historia...</div>;
  if (!story)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>No se encontró la historia.</p>
        <Link to="/leerhist" className="mt-4 text-violet-600 underline font-semibold">Volver</Link>
      </div>
    );

  const heroAnimation = isHeroInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 };
  const contentAnimation = isContentInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 };

  const canEditOrDelete = userId === story.id_usuario;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-purple-50 text-slate-800 overflow-hidden">
      {/* Header */}
      <motion.div className="relative z-20 sticky top-0 backdrop-blur-md bg-white/50 border-b border-violet-200/30 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/leerhist">
            <motion.button whileHover={{ scale: 1.05, x: -4 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-violet-100 transition-colors text-violet-600 font-semibold">
              <ArrowLeft className="w-5 h-5" />
              Volver a historias
            </motion.button>
          </Link>

          {canEditOrDelete && (
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/edithist/${story.id_historia}`)} // Aquí se iría al form de edición
                className="p-2 rounded-full hover:bg-yellow-100 transition-colors"
              >
                <Edit className="w-5 h-5 text-yellow-600" />
              </motion.button>


            </div>
          )}
        </div>
      </motion.div>



      <section ref={contentRef} className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={contentAnimation} transition={{ duration: 0.8 }} className="space-y-8">
            <motion.div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6  flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 flex items-center justify-center text-white font-bold text-2xl">{story.authorImage}</div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">{story.author}</h2>
                <p className="text-sm text-slate-600">
                  Creador de la Campaña:{" "}
                  <Link
                    to={`/campanas/${story.id_campana}`}
                    className="font-semibold text-violet-600 hover:underline"
                  >
                    {story.category}
                  </Link>
                </p>


                <p className="text-xs text-slate-500">{story.date}</p>
              </div>
            </motion.div>


            <motion.div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8  shadow-lg">
              {/* TÍTULO DE LA HISTORIA */}
              <h1 className="text-2xl font-bold text-slate-700">
                {story.title}
              </h1>


              <div className="prose prose-sm text-slate-700">
                {story.fullContent?.split("\n").map((p, i) => (<p key={i}>{p}</p>))}
              </div>
            </motion.div>
            {/* Hero y resto del contenido igual */}
            <section ref={heroRef} className="relative py-8 px-4">
              <div className="max-w-4xl mx-auto">
                {story.image.map((file, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={heroAnimation}
                    transition={{ duration: 0.8, delay: i * 0.2 }}
                    className="rounded-3xl overflow-hidden border border-violet-200 shadow-2xl shadow-violet-200/50 h-96 relative mb-8"
                    onClick={() => setSelectedImage(file)}
                  >
                    {/* Si es video → mostrar video */}
                    {isVideo(file) ? (
                      <video
                        src={file}
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={file}
                        alt={`img-${i}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </motion.div>
                ))}


              </div>
            </section>
            {selectedImage && (
              <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999]"
                onClick={() => setSelectedImage(null)}
              >
                <img
                  src={selectedImage}
                  className="max-w-[90%] max-h-[90%] rounded-2xl shadow-2xl"
                  alt="preview"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6  text-center">
                <Eye className="w-5 h-5 mx-auto text-violet-600 mb-2" />
                <span className="text-2xl font-bold text-violet-600">{(story.views / 1000).toFixed(1)}K</span>
                <p className="text-xs text-slate-600">Visualizaciones</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6  text-center">
                <Heart className="w-5 h-5 mx-auto text-red-500 mb-2" />
                <span className="text-2xl font-bold text-red-500">{story.likes}</span>
                <p className="text-xs text-slate-600">Me encanta</p>
              </div>
            </div>
          </motion.div>
          <Comments id_campana={story.id_campana} />
        </div>

      </section>

    </div>
  );
}
