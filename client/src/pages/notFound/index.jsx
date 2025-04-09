// src/pages/NotFound.jsx
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const NotFound = () => {
  return (
    <Container>
      <h1>404 - Página não encontrada</h1>
      <p>Desculpe, a página que você está procurando não existe.</p>
    </Container>
  );
};

export default NotFound;
