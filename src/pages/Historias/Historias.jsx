import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import { useRef } from "react"
import { Star, Users, Heart, MessageCircle, Share2, ArrowRight, Eye } from "lucide-react"

export default function Historias() {
  const heroRef = useRef(null)
  const storiesRef = useRef(null)
  const isLoggedIn = !!localStorage.getItem("access_token")
  const isHeroInView = useInView(heroRef, { once: true })
  const isStoriesInView = useInView(storiesRef, { once: true })

  const featuredStories = [
    {
      author: "María García",
      title: "Cómo reconstruimos nuestro hogar",
      excerpt:
        "Después de las inundaciones, creíamos que todo estaba perdido. Gracias a esta comunidad, hoy mi familia tiene un nuevo comienzo.",
      image: "/family-home-reconstruction.jpg",
      date: "15 de noviembre, 2024",
      views: 2340,
      likes: 892,
      category: "Hogares",
    },
    {
      author: "Carlos Mendez",
      title: "La educación cambió la vida de mis hijos",
      excerpt:
        "Recibir útiles y apoyo educativo fue transformacional. Ahora mis hijos pueden seguir estudiando sin limitaciones.",
      image: "/students-school-learning.jpg",
      date: "10 de noviembre, 2024",
      views: 1856,
      likes: 745,
      category: "Educación",
    },
    {
      author: "Ana López",
      title: "Juntos restauramos nuestra comunidad",
      excerpt:
        "El espacio comunitario renovado se ha convertido en el corazón de nuestro barrio. Ahora tenemos un lugar para soñar juntos.",
      image: "/community-center-people.jpg",
      date: "05 de noviembre, 2024",
      views: 3120,
      likes: 1203,
      category: "Comunidad",
    },
    {
      author: "Roberto Silva",
      title: "Pequeñas acciones, grandes cambios",
      excerpt:
        "Una donación puede parecer pequeña, pero el impacto en vidas reales es incalculable. Esta es nuestra historia de transformación.",
      image: "/helping-hands-community.jpg",
      date: "01 de noviembre, 2024",
      views: 1654,
      likes: 634,
      category: "Inspiración",
    },

  ]

  const stats = [
    { value: 156, suffix: "+", label: "Historias Compartidas" },
    { value: 45, suffix: "K+", label: "Lectores Inspirados" },
    { value: 98, suffix: "%", label: "Historias Verificadas" },
  ]

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
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex items-center justify-center gap-2">
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={isHeroInView ? { rotate: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
              >
                <Heart className="w-8 h-8 text-violet-500 fill-violet-500" />
              </motion.div>
              <span className="text-lg font-semibold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                Historias Reales
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              Vidas Transformadas
            </h1>

            <p className="text-xl md:text-2xl text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre las historias inspiradoras de personas que recibieron apoyo y lograron transformar sus vidas.
              Cada historia es un testimonio de esperanza y solidaridad.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            ref={storiesRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >

          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center mt-12"
          >
            <Link to={isLoggedIn ? "/leerhist" : "/iniciarsesion"}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(167, 139, 250, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-gradient-to-r from-violet-400 to-blue-400 rounded-2xl text-lg font-bold text-white shadow-2xl shadow-violet-300/50 overflow-hidden flex items-center gap-2"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Leer Historias
                </span>
              </motion.button>
            </Link>

            <Link to={isLoggedIn ? "/formhist" : "/iniciarsesion"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/80 backdrop-blur-sm border-2 border-violet-300 rounded-2xl text-lg font-bold text-violet-600 hover:bg-white transition-all"
              >
                <span className="flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Compartir mi Historia
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
              Historias Destacadas
            </h2>
            <p className="text-xl text-slate-600">Testimonios que inspiran y generan cambio</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-violet-200 hover:border-violet-400 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-200/50 flex flex-col h-full"
              >
                {/* Story Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-violet-200 to-blue-200">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-violet-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {story.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Story Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-3">
                    <p className="text-xs text-slate-500 mb-2">{story.date}</p>
                    <h3 className="text-lg font-bold text-slate-800 line-clamp-2 group-hover:text-violet-600 transition-colors">
                      {story.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 mb-4 flex-grow line-clamp-2">{story.excerpt}</p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-400 to-blue-400" />
                    <span className="text-sm font-semibold text-slate-700">{story.author}</span>
                  </div>

                  {/* Story Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-violet-100">
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {(story.views / 1000).toFixed(1)}K
                      </span>
                      <span className="flex items-center gap-1 text-red-500">
                        <Heart className="w-4 h-4" />
                        {story.likes}
                      </span>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Share Stories Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent"
          >
            ¿Por qué compartir tu historia?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="w-8 h-8" />,
                title: "Inspira a Otros",
                description: "Tu experiencia puede motivar a cientos de personas a tomar acción y hacer la diferencia.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Crea Comunidad",
                description:
                  "Conecta con otras personas que comparten experiencias similares y construye vínculos significativos.",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Genera Impacto",
                description: "Tus palabras pueden motivar nuevas donaciones y expandir el alcance de las campañas.",
              },
            ].map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-violet-200 hover:border-violet-400 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-200/50"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block mb-4 p-3 bg-gradient-to-br from-violet-300 to-blue-300 rounded-xl text-white"
                >
                  {reason.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-slate-800">{reason.title}</h3>
                <p className="text-slate-600 leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}
