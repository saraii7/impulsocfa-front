import supabase from "../../conexion/supabase";


export default function GoogleRegistrarseButton() {
  const handleGoogleLogin = async () => {
   try {
      // Paso 1: login con Google usando Supabase
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        console.error("Error Google:", error.message);
        alert("Error al registrarse con Google");
        return;
      }

      // Paso 2: obtener sesión de Supabase
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        alert("No se pudo obtener sesión de Google");
        return;
      }

      const accessToken = session.access_token;
      console.log("TOKEN GOOGLE:", accessToken);

      // Paso 3: enviar token a tu backend
      const res = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
      });

      if (!res.ok) throw new Error("Error al registrar en backend");

      const result = await res.json();
      console.log("Respuesta backend:", result);
      alert("Registro con Google exitoso ");
    } catch (err) {
      console.error(err);
      alert("Error inesperado en login con Google");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      style={{
        padding: "10px 20px",
        borderRadius: "10px",
        background: "#4285F4",
        color: "white",
        border: "none",
      }}
    >
      Registrarse con Google
    </button>
  );
}