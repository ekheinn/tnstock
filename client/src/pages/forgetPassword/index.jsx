import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Container, Form, Input, Button, ErrorMessage, Loading } from "./style";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);

    axios
      .post("http://127.0.0.1:8000/api/forgot-password/", {
        email: data.email,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            "E-mail de recuperação enviado! Verifique sua caixa de entrada."
          );
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(
            `Erro: ${error.response.data.error || "Erro ao enviar e-mail."}`
          );
        } else if (error.request) {
          toast.error("Erro de conexão. Verifique sua rede.");
        } else {
          toast.error("Erro ao processar a requisição.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <h2>Esqueci a Senha</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="E-mail"
          {...register("email", {
            required: "E-mail é obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "E-mail inválido",
            },
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <Button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </Form>
      {loading && <Loading>Carregando...</Loading>}
    </Container>
  );
};

export default ForgotPassword;
