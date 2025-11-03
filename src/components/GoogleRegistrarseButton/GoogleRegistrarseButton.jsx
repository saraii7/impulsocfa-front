import { supabase } from "../../supabaseClient";
import toast from "react-hot-toast";

export default function GoogleRegistrarseButton() {
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/google-callback", // la ruta a la que vuelve
      },
    });

    if (error) {
      console.error("Error en login con Google:", error.message);
      toast.error("Error al iniciar sesión con Google 😕", {
        style: {
          background: "#1e1e2f",
          color: "#e2e8f0",
          border: "1px solid rgba(139,92,246,0.4)",
          borderRadius: "12px",
          padding: "12px 16px",
        },
        iconTheme: {
          primary: "#a78bfa",
          secondary: "#1e1e2f",
        },
      });
      return;
    }

    toast.loading("Redirigiendo a Google...", {
      style: {
        background: "#1e1e2f",
        color: "#e2e8f0",
        border: "1px solid rgba(139,92,246,0.4)",
        borderRadius: "12px",
        padding: "12px 16px",
      },
    });
  };

  return (
    <button
      onClick={loginWithGoogle}
      className="w-full flex items-center justify-center gap-3 px-6 py-3
  bg-white text-slate-800 font-semibold rounded-lg
  border border-blue-200/50
  hover:bg-blue-50 hover:border-blue-300
  transition-all duration-300 hover:scale-105
  shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]
  backdrop-blur-sm"
    >
      <span className="font-medium tracking-wide">
        Continuar con{" "}
        <span className="bg-gradient-to-r from-[#EA4335] via-[#FBBC05] via-[#34A853] to-[#4285F4] bg-clip-text text-transparent font-semibold">
          Google
        </span>
      </span>
    </button>
  );
}
