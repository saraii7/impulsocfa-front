import styled from "styled-components";
import { Link } from "react-router-dom"; 
import IniciarSesionForm from "../../components/IniciarSesion/IniciarSesionForm";
import Pattern from "../../components/Pattern";
export default function IniciarSesion() {
  return (
      <Wrapper className="d-flex h-100 text-center">
      <Pattern />  {/* fondo */}
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <IniciarSesionForm />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative; 
  width: 100%;
  height: 100vh; 
`;
