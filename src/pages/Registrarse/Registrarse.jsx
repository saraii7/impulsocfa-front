import RegistrarseForm from "../../components/RegistrarseForm/RegistrarseForm";
import GoogleRegistrarseButton from "../../components/GoogleRegistrarseButton/GoogleRegistrarseButton";
import { Link } from "react-router-dom";


export default function Registrarse() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50 px-4 py-8 relative overflow-hidden">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0e7ff_1px,transparent_1px),linear-gradient(to_bottom,#e0e7ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-30" />

      {/* Esferas de luz animadas */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200/40 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.15)] border border-violet-200 p-8 relative z-10">

        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent text-center mb-8 drop-shadow-sm">
          Crear Cuenta
        </h2>

        {/* Formulario de registro */}
        <RegistrarseForm />

        {/* Opción Google */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-violet-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 text-slate-600">O continúa con</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <GoogleRegistrarseButton />
          </div>
        </div>

        {/* Link a inicio de sesión */}
        <div className="mt-6 text-center text-sm">
          <span className="text-slate-600">¿Ya tenés cuenta? </span>
          <Link
            to="/iniciarsesion"
            className="text-violet-600 hover:text-violet-700 font-semibold transition-colors duration-300 hover:underline"
          >
            Iniciá sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

