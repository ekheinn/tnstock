import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: ${(props) => (props.error ? "red" : "green")};
`;

const ConfirmEmail = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/confirm-email/${token}/`
        );

        console.log(response);

        if (response.status === 200) {
          setSuccess(true);
        }
      } catch (error) {
        console.log(error);
        setError(
          error.response?.data?.message || "Erro ao confirmar o e-mail."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      confirmEmail();
    }
  }, [token]);

  return (
    <Container>
      <Title>Confirmação de E-mail</Title>
      {loading ? (
        <Message>Carregando...</Message>
      ) : success ? (
        <Message>Seu e-mail foi confirmado com sucesso!</Message>
      ) : (
        <Message error>
          {error || "Ocorreu um erro ao confirmar seu e-mail."}
        </Message>
      )}
    </Container>
  );
};

export default ConfirmEmail;
