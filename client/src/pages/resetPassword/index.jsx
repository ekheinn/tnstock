import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Input, Button, ErrorMessage, Loading } from "./style";

const ResetPassword = () => {
  const { token } = useParams();
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
      .post(`http://127.0.0.1:8000/api/reset-password/${token}/`, {
        new_password: data.newPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Senha redefinida com sucesso!");
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(
            `Erro: ${error.response.data.error || "Erro ao redefinir senha."}`
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
      <h2>Redefinir Senha</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="password"
          placeholder="Nova Senha"
          {...register("newPassword", {
            required: "Nova senha é obrigatória",
            minLength: {
              value: 6,
              message: "A senha deve ter pelo menos 6 caracteres",
            },
          })}
        />
        {errors.newPassword && (
          <ErrorMessage>{errors.newPassword.message}</ErrorMessage>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Redefinindo..." : "Redefinir Senha"}
        </Button>
      </Form>
      {loading && <Loading>Carregando...</Loading>}
    </Container>
  );
};

export default ResetPassword;
