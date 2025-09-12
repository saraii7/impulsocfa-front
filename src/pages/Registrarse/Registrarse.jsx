import RegistrarseForm from "../../components/RegistrarseForm/RegistrarseForm";
import GoogleRegistrarseButton from "../../components/GoogleRegistrarseButton/GoogleRegistrarseButton";

export default function Registrarse() {
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <h1>Registrarse / Iniciar sesión</h1>
      
      <GoogleRegistrarseButton />
      <RegistrarseForm />
    </div>
  );
}

