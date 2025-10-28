export default function PagoFallido() {
  return (
       <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 relative overflow-hidden">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />

      {/* Esferas de luz animadas */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 bg-slate-900/50 backdrop-blur-xl shadow-[0_0_40px_rgba(239,68,68,0.3)] rounded-2xl p-8 w-full max-w-md text-center border border-red-500/30">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-rose-400 to-pink-400 bg-clip-text text-transparent mb-6 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]">
          ❌ Pago Fallido
        </h2>
        <p className="text-lg text-red-300 mb-6">
          El pago no se completó. Por favor, intenta nuevamente.
        </p>
        <a
          href="/donar"
          className="inline-block px-6 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-200 rounded-lg transition-all duration-300"
        >
          Volver a campañas
        </a>
      </div>
    </div>
  )
}