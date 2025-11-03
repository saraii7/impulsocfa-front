import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import { Heart, Shield, Users, TrendingUp, CheckCircle2 } from "lucide-react"

const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime
    let animationFrame

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const campaignsRef = useRef(null)
  const isLoggedIn = !!localStorage.getItem("access_token");

  const isHeroInView = useInView(heroRef, { once: true })
  const isStatsInView = useInView(statsRef, { once: true })
  const isCampaignsInView = useInView(campaignsRef, { once: true })

  const completedCampaigns = [
    {
      title: "Reconstrucción de Hogares",
      description: "Ayudamos a 150 familias a reconstruir sus hogares después de las inundaciones",
      raised: "$2,500,000",
      image: "/flooded-neighborhood-bahia-blanca-argentina.jpg",
      impact: "150 familias",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      title: "Apoyo Educativo",
      description: "Entregamos útiles escolares y mobiliario a 8 escuelas afectadas",
      raised: "$850,000",
      image: "/school-supplies-children-argentina.jpg",
      impact: "8 escuelas",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Rehabilitación Comunitaria",
      description: "Restauramos espacios comunitarios para 12 barrios de Bahía Blanca",
      raised: "$1,200,000",
      image: "/house-reconstruction-argentina-community.jpg",
      impact: "12 barrios",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ]

  const stats = [
    { value: 500, suffix: "+", label: "Familias Ayudadas" },
    { value: 100, suffix: "%", label: "Transparencia" },
    { value: 3, suffix: "M+", label: "Recaudado" },
    { value: 20, suffix: "+", label: "Campañas Exitosas" },
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
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isHeroInView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
            </motion.div>

            <h1 className="flex items-baseline justify-center gap-3 mb-6">
              <span className="text-5xl md:text-7xl font-serif italic bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                Impulso
              </span>
              <span className="text-5xl md:text-7xl font-bold uppercase bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                CFA
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Juntos reconstruimos vidas. Tu donación transforma proyectos que devuelven esperanza.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to={isLoggedIn ? "/donar" : "/iniciarsesion"}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(167, 139, 250, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-gradient-to-r from-violet-400 to-blue-400 rounded-2xl text-xl font-bold text-white shadow-2xl shadow-violet-300/50 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  <Heart className="w-6 h-6" />
                  Quiero donar ya!
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200 shadow-lg shadow-violet-100/50"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-slate-600 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 leading-snug bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent"
          >

            ¿Por qué elegirnos?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "100% Seguro",
                description: "Plataforma verificada con encriptación de datos y transparencia total",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Impacto Real",
                description: "Cada peso llega directamente a las familias que más lo necesitan",
              },
              {
                icon: <CheckCircle2 className="w-8 h-8" />,
                title: "Transparencia Total",
                description: "Seguimiento en tiempo real de cómo se utiliza tu donación",
              },
            ].map((feature, index) => (
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
                  className="inline-block mb-4 p-3 bg-gradient-to-br from-violet-300 to-blue-300 rounded-xl"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-slate-800">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Completed Campaigns Section */}
      <section ref={campaignsRef} className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCampaignsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
              Campañas Finalizadas
            </h2>
            <p className="text-xl text-slate-600">Gracias a tu apoyo, logramos estos increíbles resultados</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {completedCampaigns.map((campaign, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isCampaignsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-violet-200 hover:border-violet-400 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-200/50"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={campaign.image || "/placeholder.svg"}
                    alt={campaign.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute top-4 right-4 bg-green-400 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Completada
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-violet-600">
                    {campaign.icon}
                    <span className="text-sm font-semibold">{campaign.impact}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800">{campaign.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{campaign.description}</p>

                  <div className="pt-4 border-t border-violet-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Recaudado</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                        {campaign.raised}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-violet-300 shadow-xl shadow-violet-200/50"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">
              Tu ayuda puede cambiar vidas hoy
            </h2>
            <p className="text-xl text-slate-700 mb-8">
              Cada donación cuenta. Sé parte del cambio que se necesita.
            </p>
            <Link to={isLoggedIn ? "/donar" : "/iniciarsesion"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-violet-400 to-blue-400 text-white rounded-2xl text-lg font-bold shadow-2xl shadow-violet-300/50 hover:shadow-violet-300/70 transition-shadow"
              >
                Donar Ahora
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
