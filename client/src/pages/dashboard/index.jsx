import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Dashboard = () => {
  return (
    <Container>
      <Title>Dashboard</Title>
      <p>Bem-vindo à sua área protegida!</p>
    </Container>
  );
};

export default Dashboard;
