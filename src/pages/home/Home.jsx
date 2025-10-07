import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      <div className="relative z-10 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent mb-6 drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">
          Bienvenido a Impulso CFA
        </h1>

        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Una plataforma transparente y accesible para impulsar campañas sociales.
        </p>

        <Link
          to="/donar"
          className="inline-block bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 hover:from-blue-500 hover:via-violet-500 hover:to-pink-500 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:scale-105 border border-violet-400/30"
        >
          ¡Quiero donar ya!
        </Link>
      </div>
    </div>
  );
}
