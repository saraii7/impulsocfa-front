import { User } from "lucide-react";
export default function Nosotros() {
  return (
   <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent mb-6 drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">
          Nosotros
        </h1>
        
        <div className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed space-y-6">
          <p>
            Impulso CFA nació en 2024 como respuesta a las devastadoras inundaciones que afectaron a Bahía Blanca. En medio de la crisis, muchas personas querían ayudar, pero enfrentaban un problema: donar monetariamente era complicado y no había garantías de que los fondos llegaran correctamente a quienes realmente los necesitaban.
          </p>
          
          <p>
            Fue entonces cuando decidimos crear una solución diferente. Una plataforma donde la transparencia no fuera una promesa, sino una realidad verificable. Donde cualquier persona, desde cualquier lugar del mundo, pudiera contribuir con confianza y seguridad.
          </p>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-violet-500/30 rounded-2xl p-8 my-8 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-4">
              ¿Por qué Impulso CFA es diferente?
            </h2>
            <div className="space-y-3 text-left max-w-2xl mx-auto">
              <p className="flex items-start">
                <span className="text-violet-400 mr-3 mt-1">✓</span>
                <span><strong className="text-violet-300">Seguridad garantizada:</strong> cada transacción es verificable y transparente</span>
              </p>
              <p className="flex items-start">
                <span className="text-violet-400 mr-3 mt-1">✓</span>
                <span><strong className="text-violet-300">Acceso universal:</strong> dona desde cualquier lugar del mundo</span>
              </p>
              <p className="flex items-start">
                <span className="text-violet-400 mr-3 mt-1">✓</span>
                <span><strong className="text-violet-300">Múltiples métodos de pago:</strong> elige la forma que más te convenga</span>
              </p>
              <p className="flex items-start">
                <span className="text-violet-400 mr-3 mt-1">✓</span>
                <span><strong className="text-violet-300">Impacto real:</strong> tu ayuda llega directamente a quien la necesita</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-8">
            Nuestros Fundadores
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-violet-500/30 rounded-2xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all duration-300">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-full flex items-center justify-center border-2 border-violet-400/30">
                <User className="w-16 h-16 text-violet-300" />
              </div>
              <h3 className="text-xl font-semibold text-violet-300 mb-2">Camila Ocaña</h3>
              <p className="text-slate-400 text-sm">Co-fundadora</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-violet-500/30 rounded-2xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all duration-300">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-full flex items-center justify-center border-2 border-violet-400/30">
                <User className="w-16 h-16 text-violet-300" />
              </div>
              <h3 className="text-xl font-semibold text-violet-300 mb-2">Franco Jarc</h3>
              <p className="text-slate-400 text-sm">Co-fundador</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}