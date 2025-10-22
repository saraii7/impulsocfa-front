function Footer() {
  return (
    <footer className="bg-slate-950/90 backdrop-blur-xl border-t border-violet-500/20 mt-auto shadow-[0_-4px_20px_rgba(168,85,247,0.15)] relative overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-violet-500/5 to-pink-500/5" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 relative z-10">
        <div className="text-center">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            © 2025{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
              Impulso CFA
            </span>{" "}
            | Desarrollado por nuestro equipo
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
