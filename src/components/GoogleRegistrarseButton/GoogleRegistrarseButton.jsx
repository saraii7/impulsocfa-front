import styled from "styled-components";
import { supabase } from "../../supabaseClient";

export default function GoogleRegistrarseButton() {
  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/google-callback", // la ruta a la que vuelve
      },
    });

    if (error) {
      console.error("Error en login con Google:", error.message);
      alert("Error al iniciar sesión con Google");
      return;
    }

  };

  return (
    <ButtonStyled onClick={loginWithGoogle}>
      <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512">
        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
      </svg>
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
  background: linear-gradient(45deg, rgba(61, 36, 153, 1) 0%, rgba(243, 22, 22, 1) 100%);
  border: 5px solid white;
  padding: 5px;
  border-radius: 50%;
  width: 40px;
  aspect-ratio: 1;
  display: grid;
  place-content: center;
  box-shadow: rgba(133, 139, 215, 0.87) 0px 12px 10px -8px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  .svg {
    fill: white;
    margin: auto;
  }

  &:hover { transform: scale(1.2); }
  &:active { transform: scale(0.9); }
`;
