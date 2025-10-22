import { useEffect, useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Inundacion from "../../assets/inundacion.jpg";
import Inundacion1 from "../../assets/inundacion1.jpg";
import Icon1 from "../../assets/icon1.jpeg";
import Icon2 from "../../assets/icon2.jpeg";

function AnimatedCounter({ end, duration = 2, suffix = "" }) {
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
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function Nosotros() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50 text-center p-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0e7ff_1px,transparent_1px),linear-gradient(to_bottom,#e0e7ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />

      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200/40 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-72 h-72 bg-purple-200/30 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent mb-6"
        >
          Nosotros
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-slate-700 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed space-y-6"
        >
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Impulso CFA nació en 2024 como respuesta a las devastadoras inundaciones que afectaron a Bahía Blanca. En
            medio de la crisis, muchas personas querían ayudar, pero enfrentaban un problema: donar monetariamente era
            complicado y no había garantías de que los fondos llegaran correctamente a quienes realmente los
            necesitaban.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Fue entonces cuando decidimos crear una solución diferente. Una plataforma donde la transparencia no fuera
            una promesa, sino una realidad verificable. Donde cualquier persona, desde cualquier lugar del mundo,
            pudiera contribuir con confianza y seguridad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-6 my-12 p-8 bg-white/80 backdrop-blur-sm border border-violet-300 rounded-2xl shadow-xl shadow-violet-200/50"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent mb-2">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="text-sm md:text-base text-slate-600">Familias Ayudadas</div>
            </div>
            <div className="text-center border-x border-violet-300">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent mb-2">
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <div className="text-sm md:text-base text-slate-600">Transparencia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
                <AnimatedCounter end={24} suffix="/7" />
              </div>
              <div className="text-sm md:text-base text-slate-600">Disponibilidad</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent mb-6 flex items-center justify-center gap-2">
              La Crisis que nos Inspiró
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl border-2 border-violet-300 shadow-lg shadow-violet-200/50 hover:shadow-xl hover:shadow-violet-300/70 transition-all duration-300 hover:border-violet-400"
              >
                <img
                  src={Inundacion || "/placeholder.svg"}
                  alt="Zona Inundada 1"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-violet-100/95 via-violet-50/80 to-transparent p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-slate-800 text-base font-semibold">Inundaciones 2024</p>
                  <p className="text-slate-700 text-sm">Bahía Blanca</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl border-2 border-violet-300 shadow-lg shadow-violet-200/50 hover:shadow-xl hover:shadow-violet-300/70 transition-all duration-300 hover:border-violet-400"
              >
                <img
                  src={Inundacion1 || "/placeholder.svg"}
                  alt="Zona Inundada 2"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-violet-100/95 via-violet-50/80 to-transparent p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-slate-800 text-base font-semibold">Comunidades Afectadas</p>
                  <p className="text-slate-700 text-sm">Bahía Blanca</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm border border-violet-300 rounded-2xl p-8 my-8 shadow-lg shadow-violet-200/50 hover:shadow-xl hover:shadow-violet-300/70 transition-all duration-500"
          >
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent mb-6">
              ¿Por qué Impulso CFA es diferente?
            </h2>
            <div className="space-y-4 text-left max-w-2xl mx-auto">
              {[
                { icon: "🔒", title: "Seguridad garantizada", desc: "cada transacción es verificable y transparente" },
                { icon: "🌍", title: "Acceso universal", desc: "dona desde cualquier lugar del mundo" },
                { icon: "💳", title: "Múltiples métodos de pago", desc: "elige la forma que más te convenga" },
                { icon: "❤️", title: "Impacto real", desc: "tu ayuda llega directamente a quien la necesita" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-start p-4 rounded-xl bg-violet-50/50 hover:bg-violet-100/50 border border-transparent hover:border-violet-300 transition-all duration-300 group"
                >
                  <span className="text-3xl mr-4 group-hover:scale-125 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <div>
                    <span className="text-violet-600 font-semibold text-lg">{item.title}:</span>
                    <span className="text-slate-700 ml-2">{item.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent mb-8">
              Nuestros Fundadores
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {[
                { name: "Camila Ocaña", role: "Co-fundadora", image: Icon1 },
                { name: "Franco Jarc", role: "Co-fundador", image: Icon2 },
              ].map((founder, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="bg-white/80 backdrop-blur-sm border border-violet-300 rounded-2xl p-6 shadow-lg shadow-violet-200/50 hover:shadow-xl hover:shadow-violet-300/70 transition-all duration-300 hover:border-violet-400"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-violet-300 shadow-lg shadow-violet-200/50"
                  >
                    <img
                      src={founder.image || "/placeholder.svg"}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-violet-600 mb-2">{founder.name}</h3>
                  <p className="text-slate-600 text-sm">{founder.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-slate-600 text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Plataforma Verificada</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Transacciones Seguras</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>100% Transparente</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
