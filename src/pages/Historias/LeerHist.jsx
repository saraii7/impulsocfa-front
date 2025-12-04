import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import { useRef, useEffect, useState } from "react"
import { Heart, Eye, ArrowRight } from "lucide-react"
import { getAllHistories } from "../../services/history.service";



export default function LeerHist() {
  const heroRef = useRef(null);
  const storiesRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isStoriesInView = useInView(storiesRef, { once: true });

  const [stories, setStories] = useState([]);

  useEffect(() => {
    async function loadStories() {
      try {
        
        const data = await getAllHistories();
        setStories(data);
      } catch (err) {
        console.error("Error al cargar historias", err);
      }
    }

    loadStories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-purple-50 text-slate-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-violet-200/40 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-200/40 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[40vh] flex items-center justify-center px-4 py-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              Historias Reales
            </h1>

            <p className="text-xl md:text-2xl text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Conoce las experiencias reales de personas que transformaron sus vidas gracias a tu apoyo, también compartí tu propia historia para que sea escuchada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stories Grid */}
      <section ref={storiesRef} className="relative py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">

            {stories.map((story, index) => {
              const image = story.archivo1 || "/placeholder.svg";

              return (
                <motion.div
                  key={story.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isStoriesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-violet-200 hover:border-violet-400 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-200/50 flex flex-col h-full"
                >
                  {/* Story Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-violet-200 to-blue-200">
                    <img
                      src={image}
                      alt={story.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute top-3 right-3 bg-violet-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {story.nombre_campana || "Historia"}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Story Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-xs text-slate-500 mb-2">
                      {new Date(story.fecha_creacion).toLocaleDateString("es-AR")}
                    </p>

                    <h3 className="text-lg font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-violet-600 transition-colors">
                      {story.titulo}
                    </h3>

                    <p className="text-sm text-slate-600 mb-4 flex-grow line-clamp-3">
                      {story.contenido?.slice(0, 150) + "..."}
                    </p>

                    {/* Story Stats + Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          1.2K
                        </span>
                        <span className="flex items-center gap-1 text-red-500">
                          <Heart className="w-4 h-4 fill-red-500" />
                          120
                        </span>
                      </div>

                      <Link to={`/vermashist/${story.id_historia}`}>
                        <motion.button
                          whileHover={{ scale: 1.1, x: 4 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-full hover:bg-violet-100 transition-colors"
                        >
                          <ArrowRight className="w-5 h-5 text-violet-600" />
                        </motion.button>
                      </Link>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isStoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center mt-16"
          >
            <Link to="/formhist">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(167, 139, 250, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-5 bg-gradient-to-r from-violet-400 to-blue-400 rounded-2xl text-lg font-bold text-white shadow-2xl shadow-violet-300/50 overflow-hidden flex items-center gap-3"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Subí tu Historia
                  <ArrowRight className="w-5 h-5" />
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}