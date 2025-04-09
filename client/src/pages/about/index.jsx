// src/pages/About.jsx
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const About = () => {
  return (
    <Container>
      <h1>Sobre</h1>
      <p>Esta é a página sobre nós.</p>
    </Container>
  );
};

export default About;
