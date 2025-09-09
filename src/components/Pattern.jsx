import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="background" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .background {
    position: fixed; /* cambiá absolute por fixed para que sea fondo de toda la pantalla */
    inset: 0;
    width: 100%;
    height: 100%;
    background: white;
    background: radial-gradient(125% 125% at 50% 10%, #fff 40%, #63e 100%);
    z-index: -10; /* para que quede detrás del contenido */
  }
`;

export default Pattern;
