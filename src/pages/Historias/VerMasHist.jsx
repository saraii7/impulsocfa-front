import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import { useRef } from "react"
import { Heart, Eye, ArrowLeft, Share2, MessageCircle } from "lucide-react"

export default function VerMasHist() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })
  const isContentInView = useInView(contentRef, { once: true })

  // Datos de la historia seleccionada (más adelante vendrá de parámetros)
  const story = {
    author: "María García",
    title: "Cómo reconstruimos nuestro hogar",
    date: "15 de noviembre, 2024",
    category: "Hogares",
    views: 2340,
    likes: 892,
    image: "/family-home-reconstruction.jpg",
    fullContent: `Después de vivir la peor noche de nuestras vidas, cuando el agua invadió cada rincón de nuestra casa, creíamos que todo estaba perdido. Mi familia de cinco miembros quedó sin nada: nuestras pertenencias, documentos, recuerdos... todo se fue con la inundación.

Los primeros días fueron los más difíciles. No sabíamos por dónde empezar. Mi esposa lloraba viendo nuestra casa destruida, y mis hijos no entendían qué había pasado. Sentía que el mundo se derrumbaba bajo nuestros pies.

Fue entonces cuando esta comunidad extraordinaria se acercó a nosotros. No fueron solo palabras de apoyo, sino acciones concretas. Recibimos ayuda para limpiar, reparar, reconstruir. Cada día llegaban voluntarios, materiales, esperanza.

Lo más importante no fue solo la ayuda material, aunque fue crucial. Fue el mensaje que recibimos: "No estás solo, nosotros estamos contigo". Eso nos devolvió la dignidad y la fe en que las cosas podían mejorar.

Hoy, casi un año después, nuestra casa volvió a ser un hogar. No es la misma que era antes, pero es mejor porque en cada rincón está la huella de la solidaridad humana. Mis hijos vuelven a sonreír, mi esposa volvió a soñar, y yo volvía a creer que la bondad existe.

Esta historia no es solo sobre reconstruir paredes, es sobre reconstruir vidas. Y estoy profundamente agradecido por ello.`,
    authorImage: "M",
    authorBio: "Profesional en recursos humanos, padre de dos hijos y voluntario comunitario.",
  }

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

      {/* Header con botón de regreso */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 sticky top-0 backdrop-blur-md bg-white/50 border-b border-violet-200/30 px-4 py-4"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/leerhist">
            <motion.button
              whileHover={{ scale: 1.05, x: -4 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-violet-100 transition-colors text-violet-600 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver a historias
            </motion.button>
          </Link>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-violet-100 transition-colors"
            >
              
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-red-100 transition-colors"
            >
              <Heart className="w-5 h-5 text-red-500" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Hero Section con imagen grande */}
      <section ref={heroRef} className="relative py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden border border-violet-200 shadow-2xl shadow-violet-200/50 h-96"
          >
            <img src={story.image || "/placeholder.svg"} alt={story.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-violet-500/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {story.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">{story.title}</h1>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Author Info */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200 flex items-start gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                {story.authorImage}
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-slate-800">{story.author}</h2>
                <p className="text-sm text-slate-600 mb-2">{story.authorBio}</p>
                <p className="text-xs text-slate-500">{story.date}</p>
              </div>
            </motion.div>

            {/* Story Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isContentInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-violet-600" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                    {(story.views / 1000).toFixed(1)}K
                  </span>
                </div>
                <p className="text-xs text-slate-600">Visualizaciones</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                    {story.likes}
                  </span>
                </div>
                <p className="text-xs text-slate-600">Me encanta</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MessageCircle className="w-5 h-5 text-violet-600" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                    {Math.floor(story.likes / 10)}
                  </span>
                </div>
                <p className="text-xs text-slate-600">Comentarios</p>
              </div>
            </motion.div>

            {/* Full Story Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isContentInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-violet-200 shadow-lg shadow-violet-100/50"
            >
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-6">
                {story.fullContent.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-lg text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-2xl font-bold shadow-lg shadow-red-300/50 hover:shadow-red-300/70 transition-shadow flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5 fill-white" />
                Me encanta esta historia
              </motion.button>
        
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isContentInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center pt-8"
            >
              <Link to="/leerhist">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white/80 backdrop-blur-sm border-2 border-violet-200 text-violet-600 rounded-2xl font-bold hover:border-violet-400 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Volver a todas las historias
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
